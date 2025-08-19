import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Portal, TextInput } from "react-native-paper";
import { DropdownHandle, DropdownItem, DropdownProps, ModalMenuHandle } from "../types";
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

    const handleMenuItemPress = useCallback((_item: DropdownItem, index: number) => {
        setSelectedIndex(index);
        props.onSelect?.apply(null, [props.data[index], index]);
    }, []);

    return (
        <>
            <View>
                <TouchableOpacity
                    onPress={handlePress}
                >
                    <TextInput
                        mode={"outlined"}
                        focusable
                        editable={false}
                        label={props.label}
                        value={props.data[selecteIndex].label}
                        right={
                            <TextInput.Icon
                                icon={"chevron-down"}
                                onPress={handlePress}
                            />
                        }
                    />
                </TouchableOpacity>
            </View>
            <Portal>
                <ModalMenu
                    ref={modalMenuRef}
                    data={props.data}
                    onMenuItemPress={handleMenuItemPress}
                />
            </Portal>
        </>
    );
});

export default memo(Dropdown);