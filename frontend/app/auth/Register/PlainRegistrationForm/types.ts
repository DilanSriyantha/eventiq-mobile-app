export interface RegisterFormResult {
    name: string;
    email: string;
    password: string;
};

export interface PlainRegistrationFormProps {
    onSubmit?: (result: RegisterFormResult | null) => void;
    onClear?: () => void;
};

export type PlainRegistrationFormHandle = {
    submit: () => RegisterFormResult | null;
    clear: () => void;
};

export interface PlainRegistrationFormState {
    userName: string;
    email: string;
    password: string;
    passwordRepeat: string;
    passwordRepeatError: boolean;
    loading: boolean;
};

export enum ActionType {
    SET_USERNAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_PASSWORD_REPEAT,
    CLEAR_FORM,
};

export type Action = ({ type: ActionType, payload?: any });