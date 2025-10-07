import AppBarView from "@/components/AppBarView";
import ServiceDetailsInputForm from "./ServiceDetailsInputForm";
import { useCurrentUser } from "@/context/UserProvider";
import { useCallback } from "react";
import { ServiceDetailsInputFormResult } from "./ServiceDetailsInputForm/types";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useProviderServices } from "@/context/ProviderServicesProvider";
import { ProviderServiceCreateRequest } from "@/context/ProviderServicesProvider/types";
import FirebaseStorageHelper from "@/app/utils/FirebaseStorage";
import { useRouter } from "expo-router";

export default function CreateService() {
    const router = useRouter();

    const [user] = useCurrentUser();

    const providerServices = useProviderServices();
    const snackbar = useSnackbar();

    const handleSubmit = useCallback(async (result: ServiceDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!user) return;


        try {
            const storage = new FirebaseStorageHelper();
            const downloadUrl = await storage.uploadFile(result.imageUrl);

            const req: ProviderServiceCreateRequest = {
                ...result,
                providerEmail: user.email,
                imageUrl: downloadUrl,
            };
            const res = await providerServices.create(req);

            console.log(res);

            snackbar.showSuccess("Service created successfully.");

            notifyCompletion();

            router.back();
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");

            notifyError(err as Error);
        }
    }, []);

    return (
        <AppBarView title="Create Service">
            <ServiceDetailsInputForm
                onSubmit={handleSubmit}
            />
        </AppBarView>
    );
}