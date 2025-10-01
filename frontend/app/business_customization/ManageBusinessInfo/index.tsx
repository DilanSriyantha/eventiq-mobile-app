import { useServiceProviders } from "@/context/ServiceProvidersProvider";
import { ServiceProviderCreateRequest, ServiceProviderUpdateRequest } from "@/context/ServiceProvidersProvider/types";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Surface } from "react-native-paper";
import BusinessDetailsInputForm from "./BusinessDetailsInputForm";
import { BusinessDetailsInputsFormResult, onComplete, onError } from "./BusinessDetailsInputForm/types";
import { useCurrentUser } from "@/context/UserProvider";
import Utils from "@/app/utils/Utils";

export default function ManageBusinessInfo() {
    const [user] = useCurrentUser();

    const router = useRouter();

    const providers = useServiceProviders();

    const fetchProviderInfo = useCallback(async (notifyCompletion: onComplete, notifyError: onError) => {
        if (!user) return;

        try {
            const provider = await providers.getOneByProviderEmail(user.email);

            await Utils.waitFor(1000);
            notifyCompletion(provider);
        } catch (err) {
            notifyError(err instanceof Error ? err : new Error("An unknown error occurred"));
        }
    }, []);

    const handleSubmit = useCallback(async (
        result: BusinessDetailsInputsFormResult,
        notifyCompletion: onComplete,
        notifyError: onError
    ) => {
        try {
            const res = await providers.update(result as ServiceProviderUpdateRequest);

            await Utils.waitFor(1000);
            notifyCompletion();
        } catch (err) {
            notifyError(err instanceof Error ? err : new Error("An unknown error occurred"));
        }
    }, []);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={"Manage Business Info"} />
            </Appbar.Header>

            <Surface mode="flat" style={styles.container}>
                <BusinessDetailsInputForm
                    onInitialize={fetchProviderInfo}
                    onSubmit={handleSubmit}
                />
            </Surface>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});