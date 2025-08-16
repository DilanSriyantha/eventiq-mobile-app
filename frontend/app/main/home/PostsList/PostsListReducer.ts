import { Page } from "@/common/types";
import { Post } from "@/context/PostsProvider/types";
import { ActionType, PostsListAction, PostsListState } from "./types";

export const initialState: PostsListState = {
    posts: [],
    loading: true,
    allFetched: false,
    page: 0
};

export const reducer = (
    state: PostsListState, 
    action: PostsListAction
): PostsListState => {
    switch(action.type) {
        case ActionType.SET_POSTS:
            const payload = action.payload as Page<Post>;
            
            return { ...state, posts: payload.content, loading: false, allFetched: payload.last };

        case ActionType.SET_PAGE:
            if(state.loading) return state;

            if(state.allFetched) return state;

            return { ...state, page: action.payload, loading: true, allFetched: false };
            
        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
};