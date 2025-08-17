import { Post } from "@/context/PostsProvider/types";

export interface PostsListProps {
    searchKey: string;
    onItemCheckPressed?: (post: Post) => void | Promise<void>;
    onItemRatePressed?: (post: Post) => void | Promise<void>;
};

export interface PostsListState {
    posts: Post[];
    loading: boolean;
    allFetched: boolean;
    page: number;
    searchKey: string;
};

export enum ActionType {
    SET_POSTS,
    SET_PAGE,
    SET_SEARCH_KEY,
    START_LOADING,
    STOP_LOADING,
};

export type PostsListAction = {type: ActionType, payload?: any};