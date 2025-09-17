import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, Text } from "react-native-paper";
import { WelcomSectionProps } from "./types";

function WelcomeSection({ welcomNote, tags }: WelcomSectionProps) {
    return (
        <>
            {
                !tags
                    ? (
                        <ActivityIndicator
                            animating
                            size={"small"}
                        />
                    ) : (
                        <View style={styles.section}>
                            <View style={styles.sectionContentContainer}>
                                <Text variant="headlineMedium" style={styles.sectionTitle}>Welcome</Text>
                                <Text variant="bodyLarge">{welcomNote}</Text>
                                <View style={styles.tagContainer}>
                                    {tags.split(",").map((tag, idx) => (
                                        <Chip mode="outlined" key={idx}>{tag}</Chip>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )
            }
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

export default memo(WelcomeSection);