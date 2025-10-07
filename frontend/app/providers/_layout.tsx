import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";

export default function ProviderLayout() {
    const router = useRouter();

    const { title } = useLocalSearchParams();

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={"transparent"}
                style="auto"
            />

            {title && !title.includes("provider_overview") && (
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => router.back()} />
                    <Appbar.Content title={title} />
                </Appbar.Header>
            )}
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