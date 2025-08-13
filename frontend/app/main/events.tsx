import EventMenuItem from "@/components/EventMenuItem";
import ListEmptyComponent from "@/components/ListEmptyIndicator";
import { ManagableEvent } from "@/types/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";

const BogusData: ManagableEvent[] = [
    {
        id: 0,
        title: "My Event 01",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
    {
        id: 1,
        title: "My Event 02",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
    {
        id: 2,
        title: "My Event 03",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
    {
        id: 3,
        title: "My Event 04",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
];

export default function Events() {
    const [events, setEvents] = useState<ManagableEvent[]>(BogusData);

    const router = useRouter();

    const handleEventClick = useCallback((id: number) => {
        router.push("/event_customization/event_overview?title=Event Overview&id="+id as any);
    }, []);
    
    const handleAddEvent = useCallback(() => {
        router.push("/event_customization?title=Create Event" as any);
    }, []);

    return(
        <View style={styles.container}>
            <FAB
                icon="plus"
                label="New Event"
                style={styles.fab}
                onPress={handleAddEvent}
            />
            <FlatList
                data={events}
                renderItem={({item}) => <EventMenuItem {...item} onClick={() => handleEventClick(item.id)} />}
                keyExtractor={(_item, idx) => `${idx}`}
                ListEmptyComponent={<ListEmptyComponent />}
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