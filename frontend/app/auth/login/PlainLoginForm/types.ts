export interface LoginFormResult {
    email: string;
    password: string;
};

export interface PlainLoginFormProps {
    onSubmit?: (loginFormResult: LoginFormResult | null) => void;
    onClear?: () => void;
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
    CLEAR
};

export type Action = { type: ActionType, payload?: any };