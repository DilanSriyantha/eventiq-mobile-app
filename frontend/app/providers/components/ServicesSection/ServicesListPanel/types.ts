import { Page } from "@/common/types";
import { ProviderService } from "@/context/ProviderServicesProvider/types";

export interface ServicesListPanelHandle {
    loadMore: () => void;
};

export interface ServicesListPanelProps {
    onLoad: (page: number, pageSize: number, callback: onComplete) => void | Promise<void>;
    onItemClick?: (item: ProviderService) => void;
};

export interface ServiceOptionType {
    image: string;
    label: string;
    description: string;
};

export interface ServicesListPanelState {
    servicesList: ProviderService[];
    loading: boolean;
    page: number;
    pageSize: number;
};

export enum ActionType {
    SET_PAGE,
    START_LOADING,
    STOP_LOADING,
    SET_LIST,
    ADD_TO_LIST
};

export type Action = { type: ActionType, payload: any };

export type onComplete = (result: Page<ProviderService>) => void;