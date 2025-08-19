import { Action, ActionType, PlainRegistrationFormState } from "./types";

export const initialState: PlainRegistrationFormState = {
    userName: "",
    email: "",
    password: "",
    passwordRepeat: "",
    passwordRepeatError: false,
    loading: false,
};

export const reducer = (state: PlainRegistrationFormState, action: Action): PlainRegistrationFormState => {
    switch (action.type) {
        case ActionType.SET_USERNAME:
            return { ...state, userName: action.payload };

        case ActionType.SET_EMAIL:
            return { ...state, email: action.payload };

        case ActionType.SET_PASSWORD:
            return { ...state, password: action.payload };

        case ActionType.SET_PASSWORD_REPEAT:
            return { ...state, passwordRepeat: action.payload, passwordRepeatError: state.password !== action.payload };

        case ActionType.CLEAR_FORM:
            return { ...state, userName: "", email: "", password: "", passwordRepeat: "" };

        default:
            return state;
    }
};