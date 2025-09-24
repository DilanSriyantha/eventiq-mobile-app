import { Slot, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Appbar, PaperProvider, useTheme } from "react-native-paper";

export default function EventCustomizationLayout() {
    const { title } = useLocalSearchParams();

    const router = useRouter();
    const theme = useTheme();

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={"transparent"}
                style={"auto"}
            />

            <PaperProvider theme={theme}>
                {title && !title.toString().includes("Event Overview") && (
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => router.back()} />
                        <Appbar.Content title={title} />
                    </Appbar.Header>
                )}

                <View style={styles.container}>
                    <Slot />
                </View>
            </PaperProvider>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
