import { memo, useEffect } from "react";
import { NotificationCompProps } from "./types";
import { StyleSheet, View } from "react-native";
import { Icon, Surface, Text, useTheme } from "react-native-paper";
import moment from "moment";
import { useNotifications } from "@/context/WebSocketProvider";

const NotificationComp = ({ id, title, message, seen, createdAt }: NotificationCompProps) => {
    const notifications = useNotifications();
    const theme = useTheme();

    useEffect(() => {
        setTimeout(() => {
            notifications.setSeen(id);
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <Surface mode="flat">
                {!seen && (
                    <View style={styles.indicatorContainer}>
                        <Icon
                            source={"circle"}
                            size={10}
                            color={theme.colors.error}
                        />
                    </View>)}
                <Text variant="bodyLarge">{title}</Text>
                <Text variant="bodyMedium">{message}</Text>
                <Text style={{ textAlign: "right" }} variant="labelMedium">{moment(createdAt).format("YYYY-MM-DD hh:mm:ss a")}</Text>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    indicatorContainer: {
        flex: 1,
        position: "absolute",
        right: 0,
        top: 0,
        padding: 0
    }
});

export default memo(NotificationComp);