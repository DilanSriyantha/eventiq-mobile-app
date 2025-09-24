import { Page } from "@/common/types";
import { ListRenderItem } from "react-native";

export interface LazyLoadingListHandle {
    loadMore: () => void;
};

export type PageUpdater = (page: Page<any>) => void;

export interface LazyLoadingListProps {
    renderItem: ListRenderItem<any> | null | undefined;
    keyExtractor: ((item: any, index: number) => string) | undefined;
    onLoad: (page: number, updateList: PageUpdater) => Promise<void>;
};

export interface LazyLoadingListState {
    loading: boolean;
    list: any[];
    page: number;
    totalPages: number;
};

export enum ActionType {
    START_LOADING,
    STOP_LOADING,
    SET_LIST,
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
    SET_PAGE,
};

export type Action = { type: ActionType, payload: any };