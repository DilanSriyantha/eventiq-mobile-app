import EventMenuItem from "@/components/EventMenuItem";
import LazyLoadingList from "@/components/LazyLoadingList";
import { PageUpdater } from "@/components/LazyLoadingList/types";
import { useEventServices } from "@/context/EventServicesProvider";
import { useEvents } from "@/context/EventsProvider";
import { ConsumerEvent } from "@/context/EventsProvider/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Events() {
    const router = useRouter();
    const [user] = useCurrentUser();
    const events = useEvents();
    const eventServices = useEventServices();
    const snackbar = useSnackbar();

    const { serviceId } = useLocalSearchParams();

    const handleEventClick = useCallback((id: number) => {
        if (serviceId)
            addServiceToEvent(id, parseInt(serviceId as string));

        router.push(`/EventCustomization/EventOverview?title=Event Overview&id=${id}`);
    }, []);

    const handleAddEvent = useCallback(() => {
        router.push("/EventCustomization/CreateEvent?title=Create Event");
    }, []);

    const handleLoad = useCallback(async (page: number, updateList: PageUpdater) => {
        if (!user) return;

        try {
            const res = await events.getPageByUser(user.email, page, 5);

            updateList(res);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const addServiceToEvent = useCallback(async (eventId: number, serviceId: number) => {
        try {
            const res = await eventServices.addServiceToEvent(eventId, serviceId);

            snackbar.showSuccess(res.message);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    return (
        <View style={styles.container}>
            <FAB
                icon="plus"
                label="New Event"
                style={styles.fab}
                onPress={handleAddEvent}
            />

            <LazyLoadingList
                renderItem={({ item }) => <EventMenuItem {...item} onClick={() => handleEventClick(item.id)} />}
                keyExtractor={(item, idx) => `${(item as ConsumerEvent).title}-${idx}`}
                onLoad={handleLoad}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 1
    },
});