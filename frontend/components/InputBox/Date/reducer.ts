import { Action, ActionType, DateInputState } from "./types";

export const initialState: DateInputState = {
    date: new Date(),
    visible: false,
};

const reducer = (state: DateInputState, action: Action): DateInputState => {
    switch (action.type) {
        case ActionType.SET_DATE:
            return { ...state, date: action.payload, visible: state.visible ? false : state.visible };

        case ActionType.SHOW_CALENDAR:
            return { ...state, visible: true };

        case ActionType.HIDE_CALENDAR:
            return { ...state, visible: false };

        default:
            return state;
    }
};

export default reducer;