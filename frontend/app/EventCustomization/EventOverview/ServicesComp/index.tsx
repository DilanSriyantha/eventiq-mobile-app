import { StyleSheet, View } from "react-native";
import ContentBlock from "../../CreateEvent/ContentBlock";
import { ServicesCompProps } from "./types";
import { Button, Divider, Text } from "react-native-paper";
import { memo, useCallback, useEffect, useState } from "react";
import { EventService } from "@/context/EventServicesProvider/types";
import { useEventServices } from "@/context/EventServicesProvider";
import ServiceOption from "@/app/providers/ProviderOverview/ServicesSection/ServicesListPanel/ServiceOption";
import ServiceComp from "./ServiceComp";
import Utils from "@/app/utils/Utils";
import { useSnackbar } from "@/context/SnackbarProvider";

function ServicesComp({ eventId }: ServicesCompProps) {
    const [services, setServices] = useState<EventService[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const eventServices = useEventServices();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = useCallback(async () => {
        setLoading(true);

        try {
            const res = await eventServices.getAll(eventId);

            setServices(res);

            await Utils.waitFor(1000);
            setLoading(false);
        } catch (err) {
            console.log(err);

            await Utils.waitFor(1000);
            setLoading(false);
        }
    }, []);

    const handleAddPress = useCallback(() => {

    }, []);

    const handleRemoveServiceFromEvent = useCallback((eventId: number, serviceId: number) => {
        removeServiceFromEvent(eventId, serviceId);
    }, []);

    const removeServiceFromEvent = useCallback(async (eventId: number, serviceId: number) => {
        try {
            const res = await eventServices.removeServiceFromEvent(eventId, serviceId);

            setServices((prev) => [...prev.filter((s) => s.serviceId !== serviceId)]);

            snackbar.showSuccess(res.message);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);


    return (
        <ContentBlock>
            <View style={styles.headerContainer}>
                <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>Services</Text>
                <Button mode="text" icon={"plus"} onPress={handleAddPress}>Add</Button>
            </View>

            <View style={styles.eventServicesContainer}>
                {services.map((service, idx) => (
                    <View key={idx}>
                        <ServiceComp
                            key={`${idx}-${service.serviceId}-${service.title}`}
                            {...service}
                            onRemoveClick={handleRemoveServiceFromEvent}
                        />
                        {idx !== services.length - 1 && (
                            <Divider key={`${idx}-divider`} />
                        )}
                    </View>
                ))}
            </View>
        </ContentBlock>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    eventServicesContainer: {

    },
});

export default memo(ServicesComp);