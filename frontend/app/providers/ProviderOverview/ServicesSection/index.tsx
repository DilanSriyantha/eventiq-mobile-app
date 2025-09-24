import { useProviderServices } from "@/context/ProviderServicesProvider";
import { ProviderService } from "@/context/ProviderServicesProvider/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ServicesListPanel from "./ServicesListPanel";
import { onComplete } from "./ServicesListPanel/types";
import { FeaturedSectionProps } from "./types";

function ServicesSection({ providerId }: FeaturedSectionProps) {
    const router = useRouter();
    const providerServices = useProviderServices();
    const snackbar = useSnackbar();

    const handleLoad = useCallback(async (page: number, pageSize: number, callback: onComplete) => {
        try {
            const ps = await providerServices.getPageByProviderId(providerId, page, pageSize);

            callback.apply(null, [ps]);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    const handleItemClick = useCallback((item: ProviderService): void => {
        router.push(`/providers/ProductOverview?psId=${item.id}`);
    }, []);

    return (
        <View style={styles.section}>
            <View style={styles.sectionContentContainer}>
                <Text variant="headlineMedium" style={styles.sectionTitle}>Services</Text>
                <ServicesListPanel
                    onLoad={handleLoad}
                    onItemClick={handleItemClick}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {

    },
    sectionContentContainer: {
        gap: 10,
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    titleText: {
        fontWeight: "bold",
    },
    tagContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 5,
    },
});

export default memo(ServicesSection);