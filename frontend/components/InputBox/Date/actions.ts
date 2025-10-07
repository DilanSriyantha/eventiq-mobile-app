import { Action, ActionType } from "./types";

export const showCalendar = (): Action => {
    return { type: ActionType.SHOW_CALENDAR, payload: null };
};

export const hideCalendar = (): Action => {
    return { type: ActionType.HIDE_CALENDAR, payload: null };
};

export const setDate = (date: Date): Action => {
    return { type: ActionType.SET_DATE, payload: date };
};