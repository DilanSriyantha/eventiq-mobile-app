import { Action, ActionType, CommentSectionState } from "./types";

export const initialState: CommentSectionState = {
    comments: [],
    loading: false,
};

const reducer = (state: CommentSectionState, action: Action): CommentSectionState => {
    switch (action.type) {
        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.SET_COMMENTS:
            return { ...state, comments: [...state.comments, ...action.payload], loading: false };

        default:
            return state;
    }
};

export default reducer;