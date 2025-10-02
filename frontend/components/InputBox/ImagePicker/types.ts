import { ImageProps } from "react-native";

export type ImagePickerHandle = {
    getLocalUri: () => string | undefined;
    setImageUri: (imageUri: string) => void;
};

export interface ImagePickerProps {
    resizeMode?: ImageProps["resizeMode"];
    height?: ImageProps["height"];
    sourceUri?: string;
};

export interface ImagePickerState {
    imageUri: string;
    loading: boolean;
};

export enum ActionType {
    SET_IMAGE_URI,
    START_LOADING,
    STOP_LOADING,
};

export type Action = { type: ActionType, payload: any };