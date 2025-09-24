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

export const populateForm = (initialTitle: string, initialDate: Date, initialDescription: string) => {
    return { type: ActionType.POPULATE_FORM, payload: { title: initialTitle, date: initialDate, description: initialDescription } };
};

export const clear = (): Action => {
    return { type: ActionType.CLEAR, payload: null };
};