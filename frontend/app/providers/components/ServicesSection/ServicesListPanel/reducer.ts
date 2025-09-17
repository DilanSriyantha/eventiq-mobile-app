import { Action, ActionType, ServicesListPanelState } from "./types";

export const initialState: ServicesListPanelState = {
    servicesList: [],
    loading: false,
    page: 0,
    pageSize: 10,
};

const reducer = (state: ServicesListPanelState, action: Action): ServicesListPanelState => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.SET_LIST:
            return { ...state, servicesList: action.payload.content };

        case ActionType.ADD_TO_LIST:
            return { ...state, servicesList: [...state.servicesList, ...action.payload.content] };

        case ActionType.SET_PAGE:
            return { ...state, page: action.payload };

        default:
            return state;
    }
};

export default reducer;