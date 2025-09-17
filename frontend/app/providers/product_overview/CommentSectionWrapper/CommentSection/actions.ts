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