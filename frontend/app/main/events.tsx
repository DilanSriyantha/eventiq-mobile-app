import EventMenuItem from "@/components/EventMenuItem";
import ListEmptyComponent from "@/components/ListEmptyIndicator";
import { ManagableEvent } from "@/types/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";

export default function Events() {
    const [events, setEvents] = useState<ManagableEvent[]>([]);

    const router = useRouter();
    
    const handleAddEvent = useCallback(() => {
        router.push("/create_event/" as any);
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
                renderItem={({item}) => <EventMenuItem {...item} />}
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