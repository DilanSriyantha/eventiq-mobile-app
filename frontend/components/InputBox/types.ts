import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";

export interface TextProps extends TextInputProps {
    onTextChange?: (text: string) => void;
    onSubmit?: (text: string) => void;
};

export type TextHandle = {
    setText: (text: string) => void;
    getText: () => string;
    clear: () => void;
};

export interface DropdownProps {
    data: DropdownItem[];
    selectedIndex?: number;
    placeHolder?: string;
    iconName?: string;
    containerStyle?: ViewStyle;
    dropdownStyle?: ViewStyle;
    onSelect?: (item: DropdownItem, idx: number) => void;
};

export type DropdownHandle = {
    setSelectedIndex: (idx: number) => void;
    getSelectedIndex: () => number;
};

export interface DropdownItem {
    label: string;
    value: string;
};

export interface ModalMenuProps {
    data: DropdownItem[];
};

export type ModalMenuHandle = {
    show: () => void;
    dismiss: () => void;
};

export interface InputBoxComponentType extends React.MemoExoticComponent<React.ForwardRefExoticComponent<TextProps & RefAttributes<TextHandle>>> {
    Dropdown: ForwardRefExoticComponent<DropdownProps & RefAttributes<DropdownHandle>>;
};