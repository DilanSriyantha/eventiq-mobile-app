import { ConsumerEvent } from "@/context/EventsProvider/types";
import { Action, ActionType } from "./types";

export const startLoading = (): Action => {
    return { type: ActionType.START_LOADING, payload: null };
};

export const stopLoading = (): Action => {
    return { type: ActionType.STOP_LOADING, payload: null };
};

export const setEvent = (event: ConsumerEvent): Action => {
    return { type: ActionType.SET_EVENT, payload: event };
};