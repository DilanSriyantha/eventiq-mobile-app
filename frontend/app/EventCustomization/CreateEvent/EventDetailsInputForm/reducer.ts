import { Action, ActionType, EventDetailsInputFormState } from "./types";

export const initialState: EventDetailsInputFormState = {
    title: "",
    date: new Date(),
    description: ""
};

const reducer = (state: EventDetailsInputFormState, action: Action): EventDetailsInputFormState => {
    switch (action.type) {
        case ActionType.SET_TITLE:
            return { ...state, title: action.payload };

        case ActionType.SET_DATE:
            return { ...state, date: action.payload };

        case ActionType.SET_DESCRIPTION:
            return { ...state, description: action.payload };

        case ActionType.POPULATE_FORM:
            return { ...state, title: action.payload.title, date: action.payload.date, description: action.payload.description };

        case ActionType.CLEAR:
            return { ...state, title: "", date: new Date(), description: "" };

        default:
            return state;
    }
};

export default reducer;