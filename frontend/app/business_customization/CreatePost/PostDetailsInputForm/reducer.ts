import { Action, ActionType, PostDetailsInputFormState } from "./types";

export const initialState: PostDetailsInputFormState = {
    title: "",
    description: "",
    tags: "",
    imageUrl: "",
    loading: false,
    submitting: false,
};

export const reducer = (state: PostDetailsInputFormState, action: Action): PostDetailsInputFormState => {
    switch (action.type) {
        case ActionType.SET_TITLE:
            return { ...state, title: action.payload };

        case ActionType.SET_DESCRIPTION:
            return { ...state, description: action.payload };

        case ActionType.ADD_TAG:
            if (state.tags === "")
                return { ...state, tags: action.payload };

            const tmp_tags_1 = state.tags.trim().split(",");
            tmp_tags_1.push(action.payload);

            return { ...state, tags: tmp_tags_1.join(",") };

        case ActionType.REMOVE_TAG:
            const tmp_tags_2 = state.tags.trim().split(",").filter((tag) => tag !== action.payload.trim()).join(",");

            return { ...state, tags: tmp_tags_2 };

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
            return {
                ...state,
                title: action.payload.title,
                description: action.payload.description,
                tags: action.payload.tags,
                imageUrl: action.payload.imageUrl,
                loading: state.loading ? false : state.loading
            };

        default:
            return state;
    }
};