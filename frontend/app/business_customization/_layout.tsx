import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider, useTheme } from "react-native-paper";

export default function BusinessCustomization() {
    const theme = useTheme();

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={"transparent"}
                style={"auto"}
            />

            <PaperProvider theme={theme}>
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