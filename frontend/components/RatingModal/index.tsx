import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Modal, Text, useTheme } from "react-native-paper";
import RatingStrip from "../RatingStrip";
import { RatingModalProps } from "./types";

function RatingModal(props: RatingModalProps) {
    const theme = useTheme();

    return (
        <Modal
            visible={props.visible}
            onDismiss={props.onDismiss}
            contentContainerStyle={{ ...styles.menu, backgroundColor: theme.colors.onSecondary }}
        >
            <View style={styles.headerContainer}>
                <Text variant="bodyLarge">Rate your experience with the provider.</Text>
            </View>
            <Divider />
            <View style={{ padding: 10, justifyContent: "center", alignItems: "center" }}>
                <RatingStrip size={24} adjustable />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    menu: {
        marginHorizontal: 40,
        borderRadius: 8,
        paddingVertical: 0,
        elevation: 0,
    },
    headerContainer: {
        paddingTop: 12,
        paddingBottom: 10,
        paddingHorizontal: 16,
    },
});

export default memo(RatingModal);