import { ConsumerEvent } from "@/context/EventsProvider/types";

export interface EventOverviewState {
    loading: boolean;
    event: ConsumerEvent | null;
};

export enum ActionType {
    START_LOADING,
    STOP_LOADING,
    SET_EVENT,
};

export type Action = { type: ActionType, payload: any };