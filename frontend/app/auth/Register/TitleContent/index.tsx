import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function TitleContent() {

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text variant="headlineLarge" style={styles.titleHeadline}>EVORA</Text>
                <Text variant="headlineSmall">Join with us!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingBottom: 15
    },
    titleContainer: {
        flex: 1,
        gap: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    titleHeadline: {
        fontWeight: "500",
    },
});