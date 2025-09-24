import { Action, ActionType } from "./types";

export const setTitle = (title: string): Action => {
    return { type: ActionType.SET_TITLE, payload: title };
};

export const setDate = (date: Date): Action => {
    return { type: ActionType.SET_DATE, payload: date };
};

export const setDescription = (description: string): Action => {
    return { type: ActionType.SET_DESCRIPTION, payload: description };
};

export const clear = (): Action => {
    return { type: ActionType.CLEAR, payload: null };
};