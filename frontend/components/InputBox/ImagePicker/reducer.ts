import { Action, ActionType, ImagePickerState } from "./types";

export const initialState: ImagePickerState = {
    imageUri: "",
    loading: false,
};

export const reducer = (state: ImagePickerState, action: Action): ImagePickerState => {
    switch (action.type) {
        case ActionType.SET_IMAGE_URI:
            return { ...state, imageUri: action.payload };

        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
};