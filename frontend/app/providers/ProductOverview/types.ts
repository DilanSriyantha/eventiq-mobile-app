import { ProviderService } from "@/context/ProviderServicesProvider/types";

export interface ProductOverviewState {
    loading: boolean;
    product: ProviderService | null;
};

export enum ActionType {
    START_LOADING,
    STOP_LOADING,
    SET_PRODUCT
};

export type Action = { type: ActionType, payload: any };