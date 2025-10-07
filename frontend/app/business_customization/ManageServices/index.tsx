import PostsList from "@/app/main/home/PostsList";
import ServicesListPanel from "@/app/providers/ProviderOverview/ServicesSection/ServicesListPanel";
import AppBarView from "@/components/AppBarView";
import { Post } from "@/context/PostsProvider/types";
import { useCurrentUser } from "@/context/UserProvider";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { onComplete } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useProviderServices } from "@/context/ProviderServicesProvider";
import { ProviderService } from "@/context/ProviderServicesProvider/types";

export default function ManageServices() {
    const [user] = useCurrentUser();

    const router = useRouter();
    const snackbar = useSnackbar();
    const services = useProviderServices();

    const handleNewServiceClick = useCallback(() => {
        router.push("/business_customization/CreateService" as any);
    }, []);

    const handleServiceEditClick = useCallback((service: ProviderService) => {
        router.push(`/business_customization/EditService?serviceId=${service.id}` as any);
    }, []);

    const fetchServices = useCallback(async (page: number, pageSize: number, notifyCompletion: onComplete) => {
        if (!user) return;

        try {
            const res = await services.getPageByProviderEmail(user.email, page, pageSize);

            notifyCompletion(res);
        } catch (err) {
            console.log(err instanceof Error ? err.message : "An unknown error occurred");
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    return (
        <AppBarView title="Manage Services">
            <FAB
                icon={"plus"}
                label={"New Service"}
                style={styles.fab}
                onPress={handleNewServiceClick}
            />

            <ScrollView style={styles.scrollContainer}>
                <ServicesListPanel
                    onLoad={fetchServices}
                    onItemClick={handleServiceEditClick}
                />
            </ScrollView>
        </AppBarView>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 20,
        zIndex: 1
    },
    scrollContainer: {
        flex: 1,
    }
});