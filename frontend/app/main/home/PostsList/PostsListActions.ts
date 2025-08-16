import { Page } from "@/common/types";
import { Post } from "@/context/PostsProvider/types";
import { ActionType, PostsListAction } from "./types";

export const setPosts = (page: Page<Post>): PostsListAction => ({
    type: ActionType.SET_POSTS,
    payload: page,
});

export const setPage = (page: number): PostsListAction => ({
    type: ActionType.SET_PAGE,
    payload: page,
});

export const startLoading = (): PostsListAction => ({
    type: ActionType.START_LOADING
});

export const stopLoading = (): PostsListAction => ({
    type: ActionType.STOP_LOADING
});