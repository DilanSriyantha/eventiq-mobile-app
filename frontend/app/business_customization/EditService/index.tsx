import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import AppBarView from "@/components/AppBarView";
import PostDetailsInputForm from "../CreatePost/PostDetailsInputForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { useProviderServices } from "@/context/ProviderServicesProvider";
import { ServiceDetailsInputFormResult } from "../CreateService/ServiceDetailsInputForm/types";
import { ProviderServiceUpdateRequest } from "@/context/ProviderServicesProvider/types";
import ServiceDetailsInputForm from "../CreateService/ServiceDetailsInputForm";

export default function EditService() {
    const { serviceId } = useLocalSearchParams();

    const [user] = useCurrentUser();

    const router = useRouter();
    const providerServices = useProviderServices();
    const snackbar = useSnackbar();

    const fetchPost = useCallback(async (notifyCompletion: onComplete, notifyError: onError) => {
        if (!serviceId) return;

        try {
            const service = await providerServices.getOne(parseInt(serviceId.toString()));

            notifyCompletion(service);
        } catch (err) {
            console.log(err);

            notifyError(err instanceof Error ? err : new Error("An unknown error occurred"));

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    const handleSubmit = async (result: ServiceDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!serviceId) return;

        if (!user) return;

        try {
            const req: ProviderServiceUpdateRequest = {
                ...result,
                serviceId: parseInt(serviceId.toString()),
                providerEmail: user.email,
            };

            const res = await providerServices.update(req);

            console.log(res);

            snackbar.showSuccess("Post updated successfully.");

            notifyCompletion();
        } catch (err) {
            console.log(err);

            notifyError(err instanceof Error ? err : new Error("An unknown error occurred while creating a new post."));

            throw err;
        }
    };

    const handleDelete = useCallback(async (error: onError) => {
        if (!serviceId) return;

        try {
            const deleted = await providerServices.deleteOne(parseInt(serviceId.toString()));

            console.log(deleted);

            snackbar.showSuccess("Service deleted successfully.");

            router.back();
        } catch (err) {
            error(err as any);
        }
    }, []);

    return (
        <AppBarView title="Edit Post">
            <ServiceDetailsInputForm
                onInitialize={fetchPost}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </AppBarView>
    );
}