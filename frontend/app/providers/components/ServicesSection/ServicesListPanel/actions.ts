import { Page } from "@/common/types";
import { ProviderService } from "@/context/ProviderServicesProvider/types";
import { Action, ActionType } from "./types";

export const startLoading = (): Action => {
    return { type: ActionType.START_LOADING, payload: null };
};

export const stopLoading = (): Action => {
    return { type: ActionType.STOP_LOADING, payload: null };
};

export const setList = (page: Page<ProviderService>): Action => {
    return { type: ActionType.SET_LIST, payload: page };
};

export const addToList = (page: Page<ProviderService>): Action => {
    return { type: ActionType.ADD_TO_LIST, payload: page };
};

export const setPage = (page: number): Action => {
    return { type: ActionType.SET_PAGE, payload: page };
};