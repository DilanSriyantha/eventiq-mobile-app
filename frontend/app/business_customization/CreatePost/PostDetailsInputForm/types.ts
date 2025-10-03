import { Post, PostUpdateRequest } from "@/context/PostsProvider/types";
import { onComplete, onError } from "../../ManageBusinessInfo/BusinessDetailsInputForm/types";

export interface PostDetailsInputFormProps {
    initialData?: PostUpdateRequest;
    onInitialize?: (notifyCompletion: onComplete, notifyError: onError) => void | Promise<void>;
    onSubmit?: (result: PostDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => void | Promise<void>;
    onDelete?: (error: (err: Error) => void) => void | Promise<void>;
};

export interface PostDetailsInputFormState extends Omit<PostUpdateRequest, "providerEmail" | "postId"> {
    loading: boolean;
    submitting: boolean;
};

export type PostDetailsInputFormResult = PostDetailsInputFormState;

export enum ActionType {
    SET_TITLE,
    SET_DESCRIPTION,
    ADD_TAG,
    REMOVE_TAG,
    SET_IMAGE_URL,
    START_LOADING,
    STOP_LOADING,
    START_SUBMITTING,
    STOP_SUBMITTING,
    POPULATE_FORM,
};

export type Action = { type: ActionType, payload: any };