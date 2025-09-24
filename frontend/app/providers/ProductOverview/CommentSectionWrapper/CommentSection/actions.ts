import { Comment } from "@/context/CommentsProvider/types";
import { Action, ActionType } from "./types";

export const startLoading = (): Action => {
    return { type: ActionType.START_LOADING, payload: null };
};

export const stopLoading = (): Action => {
    return { type: ActionType.STOP_LOADING, payload: null };
};

export const setComments = (comments: Comment[]): Action => {
    return { type: ActionType.SET_COMMENTS, payload: comments };
};

export const addComment = (comment: Comment): Action => {
    return { type: ActionType.ADD_COMMENT, payload: comment };
};

export const removeComment = (id: number): Action => {
    return { type: ActionType.REMOVE_COMMENT, payload: id };
};