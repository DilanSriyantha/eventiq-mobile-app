import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function NotificationLayout() {
    const router = useRouter();

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={"transparent"}
                style="auto"
            />

            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={"Notifications"} />
            </Appbar.Header>

            <View style={styles.container}>
                <Slot />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});