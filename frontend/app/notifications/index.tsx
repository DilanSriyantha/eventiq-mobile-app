import { FlatList, StyleSheet } from "react-native";
import NotificationComp from "./NotificationComp";
import { Divider, Surface } from "react-native-paper";
import { useNotifications } from "@/context/WebSocketProvider";

export default function Notifications() {
    const notifications = useNotifications();

    return (
        <Surface mode="flat" style={styles.container}>
            <FlatList
                data={notifications.getAll()}
                renderItem={({ item }) => (
                    <NotificationComp
                        {...item}
                    />
                )}
                keyExtractor={(item, idx) => `${item.title}-${idx}`}
                ItemSeparatorComponent={() => { return <Divider /> }}
            />
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 35,
    }
});