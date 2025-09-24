import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { DescriptionSectionProps } from "./types";

function DescriptionSection({ description }: DescriptionSectionProps) {

    return (
        <View style={styles.section}>
            <View style={styles.sectionContentContainer}>
                <Text variant="headlineMedium" style={styles.sectionTitle}>Description</Text>
                <Text variant="bodyLarge">{description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {

    },
    sectionContentContainer: {
        gap: 10,
    },
    sectionTitle: {
        fontWeight: "bold",
    },
});

export default memo(DescriptionSection);