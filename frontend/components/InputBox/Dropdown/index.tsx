import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { DropdownHandle, DropdownProps, ModalMenuHandle } from "../types";
import ModalMenu from "./ModalMenu";

const Dropdown = forwardRef<DropdownHandle, DropdownProps>((props, ref) => {
    const [selecteIndex, setSelectedIndex] = useState<number>(props.selectedIndex ? props.selectedIndex : 0);

    const modalMenuRef = useRef<ModalMenuHandle>(null);

    useImperativeHandle(ref, () => ({
        setSelectedIndex: handleSetSelectedIndex,
        getSelectedIndex: handleGetSelectedIndex,
    }));

    const handleSetSelectedIndex = useCallback((idx: number) => {
        setSelectedIndex(idx);
    }, []);

    const handleGetSelectedIndex = useCallback((): number => {
        return selecteIndex;
    }, [selecteIndex]);

    const handlePress = useCallback(() => {
        modalMenuRef.current?.show();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={handlePress}
            >
                <TextInput
                    mode={"outlined"}
                    focusable
                    editable={false}
                />
            </TouchableOpacity>
            <View style={styles.modalContainer}>
                <ModalMenu
                    ref={modalMenuRef}
                    data={props.data}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
    },
    modalContainer: {
    }
});

export default memo(Dropdown);