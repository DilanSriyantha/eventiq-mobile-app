import RatingStrip from "@/components/RatingStrip";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { RatingSectionProps } from "./types";

function RatingSection({ value }: RatingSectionProps) {

    return (
        <>
            <View style={styles.section}>
                <View style={styles.sectionContentContainer}>
                    {
                        !value
                            ? (
                                <ActivityIndicator
                                    animating
                                    size={"small"}
                                />
                            ) : (
                                <>
                                    <Text variant="headlineMedium" style={styles.sectionTitle}>Rating</Text>
                                    <RatingStrip
                                        value={value}
                                        size={24}
                                    />
                                </>
                            )
                    }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    section: {

    },
    sectionContentContainer: {
        gap: 10,
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    titleText: {
        fontWeight: "bold",
    },
    tagContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 5,
    },
});

export default memo(RatingSection);