import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Modal, Text } from "react-native-paper";
import { ModalMenuHandle, ModalMenuProps } from "../types";

const ModalMenu = forwardRef<ModalMenuHandle, ModalMenuProps>(({ data }, ref) => {
const [isVisible, setVisible] = useState<boolean>(false);

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

    }, [data]);

    return (
        <Modal
            visible={isVisible}
            onDismiss={handleDismiss}
        >
            <TouchableOpacity
                style={styles.overlay}
                onPress={handleDismiss}
                activeOpacity={1}
            >
                <View style={styles.menu}>
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
                </View>
            </TouchableOpacity>
        </Modal>
    );
});

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#00000055"
    },
    menu: {
        marginHorizontal: 40,
        borderRadius: 8,
        paddingVertical: 0,
        elevation: 4,
    },
    menuItem: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default memo(ModalMenu);