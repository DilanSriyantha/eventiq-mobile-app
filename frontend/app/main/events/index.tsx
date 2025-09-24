import EventMenuItem from "@/components/EventMenuItem";
import LazyLoadingList from "@/components/LazyLoadingList";
import { PageUpdater } from "@/components/LazyLoadingList/types";
import { useEvents } from "@/context/EventsProvider";
import { ConsumerEvent } from "@/context/EventsProvider/types";
import { useCurrentUser } from "@/context/UserProvider";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";

export default function Events() {
    const router = useRouter();
    const [user, setUser] = useCurrentUser();
    const events = useEvents();

    const handleEventClick = useCallback((id: number) => {
        router.push("/event_customization/event_overview?title=Event Overview&id=" + id as any);
    }, []);

    const handleAddEvent = useCallback(() => {
        router.push("/event_customization?title=Create Event" as any);
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