import { Role } from "@/app/enums/Role";
import { ViewProps } from "react-native";

export interface RegisterFormResult {
    role: Role;
    name: string;
    email: string;
    password: string;
};

export interface PlainRegistrationFormProps extends ViewProps {
    onSubmit?: (result: RegisterFormResult | null) => void;
    onClear?: () => void;
    loading?: boolean;
};

export type PlainRegistrationFormHandle = {
    submit: () => RegisterFormResult | null;
    clear: () => void;
};

export interface PlainRegistrationFormState {
    role: Role;
    userName: string;
    email: string;
    password: string;
    passwordRepeat: string;
    passwordRepeatError: boolean;
};

export enum ActionType {
    SET_ROLE,
    SET_USERNAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_PASSWORD_REPEAT,
    CLEAR_FORM,
};

export type Action = ({ type: ActionType, payload?: any });