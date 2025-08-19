import { Action, ActionType, PlainLoginFormState } from "./types";

export const initialState: PlainLoginFormState = {
    email: "",
    password: ""
};

export const reducer = (state: PlainLoginFormState, action: Action): PlainLoginFormState => {
    switch (action.type) {
        case ActionType.SET_EMAIL:
            return { ...state, email: action.payload };

        case ActionType.SET_PASSWORD:
            return { ...state, password: action.payload };

        case ActionType.CLEAR:
            return { ...state, email: "", password: "" };

        default:
            return state;
    }
};