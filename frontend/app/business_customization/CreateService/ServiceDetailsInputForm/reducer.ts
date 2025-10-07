import { Action, ActionType, ServiceDetailsInputFormState } from "./types";

export const initialState: ServiceDetailsInputFormState = {
    title: "",
    description: "",
    imageUrl: "",
    loading: false,
    submitting: false,
};

export const reducer = (state: ServiceDetailsInputFormState, action: Action): ServiceDetailsInputFormState => {
    switch (action.type) {
        case ActionType.SET_TITLE:
            return { ...state, title: action.payload };

        case ActionType.SET_DESCRIPTION:
            return { ...state, description: action.payload };

        case ActionType.SET_IMAGE_URL:
            return { ...state, imageUrl: action.payload };

        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.START_SUBMITTING:
            return { ...state, submitting: true };

        case ActionType.STOP_SUBMITTING:
            return { ...state, submitting: false };

        case ActionType.POPULATE_FORM:
            return { ...state, ...action.payload, loading: state.loading ? false : state.loading };

        default:
            return state;
    }
};