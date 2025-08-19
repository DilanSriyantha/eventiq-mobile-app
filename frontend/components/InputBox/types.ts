import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { ViewProps, ViewStyle } from "react-native";
import { TextInputProps } from "react-native-paper";

export interface TextProps extends TextInputProps {
    passwordShowHideEnabled?: boolean;
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
    label?: string;
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
    onMenuItemPress?: (item: DropdownItem, index: number) => void;
    style?: ViewProps["style"];
};

export type ModalMenuHandle = {
    show: () => void;
    dismiss: () => void;
};

export interface InputBoxComponentType extends React.MemoExoticComponent<React.ForwardRefExoticComponent<TextProps & RefAttributes<TextHandle>>> {
    Dropdown: ForwardRefExoticComponent<DropdownProps & RefAttributes<DropdownHandle>>;
    Text: ForwardRefExoticComponent<TextProps & RefAttributes<TextHandle>>;
};