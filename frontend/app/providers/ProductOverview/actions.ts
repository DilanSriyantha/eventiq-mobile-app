import { ProviderService } from "@/context/ProviderServicesProvider/types";
import { Action, ActionType } from "./types";

export const startLoading = (): Action => {
    return { type: ActionType.START_LOADING, payload: null };
}

export const stopLoading = (): Action => {
    return { type: ActionType.STOP_LOADING, payload: null };
};

export const setProduct = (product: ProviderService): Action => {
    return { type: ActionType.SET_PRODUCT, payload: product };
};