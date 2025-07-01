import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

export default function ListEmptyComponent() {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <Icon source="inbox" color={theme.colors.surfaceVariant} size={24} />
            <Text style={{...styles.labelText, color: theme.colors.surfaceVariant}} variant="labelLarge" >{`Your events list is empty.\nTry creating new events.`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    labelText: {
        fontStyle: "italic"
    }
});