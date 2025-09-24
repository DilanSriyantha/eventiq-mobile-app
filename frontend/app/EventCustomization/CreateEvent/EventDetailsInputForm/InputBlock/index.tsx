import { StyleSheet, View } from "react-native";
import { InputBlockProps } from "./types";
import { memo } from "react";
import { Text } from "react-native-paper";

function InputBlock({ label, children }: InputBlockProps) {

    return (
        <View style={styles.inputBlock}>
            <View style={styles.labelContainer}>
                <Text variant="labelLarge">{label}</Text>
            </View>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    inputBlock: {

    },
    labelContainer: {
        paddingBottom: 5,
    },
    button: {
        padding: 5,
        borderRadius: 5
    }
});

export default memo(InputBlock);