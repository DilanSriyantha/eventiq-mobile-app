import { Action, ActionType } from "./types";

export const setEmail = (email: string): Action => {
    return { type: ActionType.SET_EMAIL, payload: email };
}

export const setPassword = (password: string): Action => {
    return { type: ActionType.SET_PASSWORD, payload: password };
};

export const clear = (): Action => {
    return { type: ActionType.CLEAR };
};