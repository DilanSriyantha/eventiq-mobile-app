import { Page } from "@/common/types";
import { Action, ActionType } from "./types";

export const startLoading = (): Action => {
    return { type: ActionType.START_LOADING, payload: null };
};

export const stopLoading = (): Action => {
    return { type: ActionType.STOP_LOADING, payload: null };
};

export const setList = (list: any[]): Action => {
    return { type: ActionType.SET_LIST, payload: list };
};

export const addToList = (page: Page<any>): Action => {
    return { type: ActionType.ADD_TO_LIST, payload: page };
};

export const removeFromList = (id: number): Action => {
    return { type: ActionType.REMOVE_FROM_LIST, payload: id };
};

export const setPage = (page: number): Action => {
    return { type: ActionType.SET_PAGE, payload: page };
};