import { Post } from "@/context/PostsProvider/types";

export interface PostsListProps {
    searchKey: string;
};

export interface PostsListState {
    posts: Post[];
    loading: boolean;
    allFetched: boolean;
    page: number;
};

export enum ActionType {
    SET_POSTS,
    SET_PAGE,
    START_LOADING,
    STOP_LOADING,
};

export type PostsListAction = {type: ActionType, payload?: any};