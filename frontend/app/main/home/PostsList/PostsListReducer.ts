import { Page } from "@/common/types";
import { Post } from "@/context/PostsProvider/types";
import { ActionType, PostsListAction, PostsListState } from "./types";

export const initialState: PostsListState = {
    posts: [],
    loading: true,
    allFetched: false,
    page: 0,
    searchKey: "",
};

export const reducer = (
    state: PostsListState, 
    action: PostsListAction
): PostsListState => {
    switch(action.type) {
        case ActionType.SET_POSTS:
            const payload = action.payload as Page<Post>;
            
            return { ...state, posts: [...state.posts, ...payload.content], loading: false, allFetched: payload.last };

        case ActionType.SET_PAGE:
            if(state.loading) return state;

            if(state.allFetched) return state;

            return { ...state, page: action.payload, loading: true, allFetched: false };
            
        case ActionType.SET_SEARCH_KEY:
            return { ...state, posts: [], page: 0, loading: true, allFetched: false, searchKey: action.payload };

        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
};