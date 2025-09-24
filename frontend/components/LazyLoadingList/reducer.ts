import { Page } from "@/common/types";
import { Action, ActionType, LazyLoadingListState } from "./types";

export const initialState: LazyLoadingListState = {
    loading: false,
    list: [],
    page: -1,
    totalPages: -1,
};

const reducer = (state: LazyLoadingListState, action: Action): LazyLoadingListState => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.SET_LIST:
            return { ...state, list: action.payload, loading: false };

        case ActionType.ADD_TO_LIST:
            const page: Page<any> = action.payload;

            return { ...state, list: [...state.list, ...page.content], totalPages: page.totalPages, loading: false };

        case ActionType.REMOVE_FROM_LIST:
            return { ...state, list: state.list.filter((i) => i.id !== action.payload), loading: false };

        case ActionType.SET_PAGE:
            return { ...state, loading: true, page: action.payload };

        default:
            return state;
    }
};

export default reducer;