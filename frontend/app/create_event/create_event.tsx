import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Surface, Text, TextInput } from "react-native-paper";

export default function CreateEvent() {
    
    return (
        <Surface style={styles.container} mode="flat">
            <Card mode="contained" style={styles.content}>
                <TextInput mode="outlined" label="Title" inputMode="text" />
                <TextInput mode="outlined" label="Date" inputMode="text" />
            </Card>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    content: {
        padding: 10,
    },
});