import { Action, ActionType, EventOverviewState } from "./types";

export const initialState: EventOverviewState = {
    loading: true,
    event: null,
};

const reducer = (state: EventOverviewState, action: Action): EventOverviewState => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.SET_EVENT:
            return { ...state, event: action.payload, loading: state.loading ? false : state.loading };

        default:
            return state;
    }
};

export default reducer;