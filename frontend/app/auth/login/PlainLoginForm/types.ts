import { ViewProps } from "react-native";

export interface LoginFormResult {
    email: string;
    password: string;
};

export interface PlainLoginFormProps extends ViewProps {
    onSubmit?: (loginFormResult: LoginFormResult | null) => void;
    onClear?: () => void;
    loading?: boolean;
};

export interface PlainLoginFormHandle {
    submit: () => LoginFormResult | null;
    clear: () => void;
};

export interface PlainLoginFormState {
    email: string;
    password: string;
};

export enum ActionType {
    SET_EMAIL,
    SET_PASSWORD,
    START_LOADING,
    STOP_LOADING,
    CLEAR
};

export type Action = { type: ActionType, payload?: any };