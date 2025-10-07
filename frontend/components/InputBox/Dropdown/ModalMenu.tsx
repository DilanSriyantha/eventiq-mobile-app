import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, Modal, Text, useTheme } from "react-native-paper";
import { ModalMenuHandle, ModalMenuProps } from "../types";

const ModalMenu = forwardRef<ModalMenuHandle, ModalMenuProps>(({ data, onMenuItemPress }, ref) => {
    const [isVisible, setVisible] = useState<boolean>(false);

    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        show: handleShow,
        dismiss: handleDismiss,
    }));

    const handleShow = useCallback(() => {
        setVisible(true);
    }, []);

    const handleDismiss = useCallback(() => {
        setVisible(false);
    }, []);

    const handleMenuItemPress = useCallback((idx: number) => {
        handleDismiss();
        onMenuItemPress?.apply(null, [data[idx], idx]);
    }, [data]);

    return (
        <Modal
            visible={isVisible}
            onDismiss={handleDismiss}
            contentContainerStyle={{ ...styles.menu, backgroundColor: theme.colors.onSecondary }}
        >
            <View style={styles.headerContainer}>
                <Text variant={"bodyLarge"}>Select an option...</Text>
            </View>
            <Divider />
            <FlatList
                data={data}
                keyExtractor={(item, idx) => `${item.value}-${idx}`}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => handleMenuItemPress(index)}
                    >
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                )}
            />
        </Modal>
    );
});

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 12,
        paddingBottom: 10,
        paddingHorizontal: 16
    },
    menu: {
        marginHorizontal: 40,
        borderRadius: 8,
        paddingVertical: 0,
        // elevation: 4,
        elevation: 0,
    },
    menuItem: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default memo(ModalMenu);