import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import CommentSection from "./CommentSection";
import { CommentSectionWrapperProps } from "./types";

function CommentSectionWrapper({ serviceId }: CommentSectionWrapperProps) {

    return (
        <View style={styles.section}>
            <View style={styles.sectionContentContainer}>
                <Text variant="headlineMedium" style={styles.sectionTitle}>Comments</Text>
                <CommentSection serviceId={serviceId} />
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

export default memo(CommentSectionWrapper);