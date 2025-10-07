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

        case ActionType.ADD_COMMENT:
            return { ...state, comments: [...state.comments, action.payload], loading: state.loading ? false : state.loading };

        case ActionType.REMOVE_COMMENT:
            return { ...state, comments: state.comments.filter((c) => c.id !== action.payload) };

        default:
            return state;
    }
};

export default reducer;