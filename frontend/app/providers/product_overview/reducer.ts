import { Action, ActionType, ProductOverviewState } from "./types";

export const initialState: ProductOverviewState = {
    product: null,
    loading: false
};

const reducer = (state: ProductOverviewState, action: Action): ProductOverviewState => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.SET_PRODUCT:
            return { ...state, product: action.payload, loading: false };

        default:
            return state;
    }
};

export default reducer;