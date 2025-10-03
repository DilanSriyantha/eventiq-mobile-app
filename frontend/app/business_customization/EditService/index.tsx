import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import AppBarView from "@/components/AppBarView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useProviderServices } from "@/context/ProviderServicesProvider";
import { ServiceDetailsInputFormResult } from "../CreateService/ServiceDetailsInputForm/types";
import { ProviderService, ProviderServiceUpdateRequest } from "@/context/ProviderServicesProvider/types";
import ServiceDetailsInputForm from "../CreateService/ServiceDetailsInputForm";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import FirebaseStorageHelper from "@/app/utils/FirebaseStorage";

export default function EditService() {
    const { serviceId } = useLocalSearchParams();

    const [user] = useCurrentUser();
    const [service, setService] = useState<ProviderService | null>(null);

    const router = useRouter();
    const providerServices = useProviderServices();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = useCallback(async () => {
        if (!serviceId) return;

        try {
            const service = await providerServices.getOne(parseInt(serviceId.toString()));

            setService(service);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, [service]);

    const handleSubmit = async (result: ServiceDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!serviceId) return;

        if (!user) return;

        if (!service) return;

        try {
            const hasImageChanged = result.imageUrl !== service.imageUrl;

            let downloadUrl = result.imageUrl;
            if (hasImageChanged) {
                const storage = new FirebaseStorageHelper();
                downloadUrl = await storage.uploadFile(result.imageUrl);
            }

            const req: ProviderServiceUpdateRequest = {
                ...result,
                serviceId: parseInt(serviceId.toString()),
                providerEmail: user.email,
            };

            const res = await providerServices.update(req);

            console.log(res);

            snackbar.showSuccess("Post updated successfully.");

            notifyCompletion();

            router.back();
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
            {
                user && service ? (
                    <ServiceDetailsInputForm
                        initialData={{ ...service, providerEmail: user.email, serviceId: service.id } as ProviderServiceUpdateRequest}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            animating
                            size={"large"}
                        />
                    </View>
                )
            }
        </AppBarView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});