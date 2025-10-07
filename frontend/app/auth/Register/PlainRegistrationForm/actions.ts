import { Role } from "@/app/enums/Role";
import { Action, ActionType } from "./types";

export const setRole = (role: Role): Action => {
    return { type: ActionType.SET_ROLE, payload: role };
};

export const setUsername = (username: string): Action => {
    return { type: ActionType.SET_USERNAME, payload: username };
};

export const setEmail = (email: string): Action => {
    return { type: ActionType.SET_EMAIL, payload: email };
};

export const setPassword = (password: string): Action => {
    return { type: ActionType.SET_PASSWORD, payload: password };
};

export const setPasswordRepeat = (password: string): Action => {
    return { type: ActionType.SET_PASSWORD_REPEAT, payload: password };
};

export const clear = (): Action => {
    return { type: ActionType.CLEAR_FORM };
};