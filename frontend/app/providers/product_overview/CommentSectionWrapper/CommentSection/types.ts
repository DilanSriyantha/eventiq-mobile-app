import { Comment } from "@/context/CommentsProvider/types";

export interface CommentSectionProps {
    serviceId: number;
};

export interface CommentSectionState {
    comments: Comment[];
    loading: boolean;
};

export enum ActionType {
    START_LOADING,
    STOP_LOADING,
    SET_COMMENTS
}

export type Action = { type: ActionType, payload: any };