import { Action, ActionType, PostDetailsInputFormState } from "./types";

export const setTitle = (title: string): Action => {
    return { type: ActionType.SET_TITLE, payload: title };
};

export const setImageUrl = (imageUrl: string): Action => {
    return { type: ActionType.SET_IMAGE_URL, payload: imageUrl };
};

export const setDescription = (description: string): Action => {
    return { type: ActionType.SET_DESCRIPTION, payload: description };
};

export const addTag = (tag: string): Action => {
    return { type: ActionType.ADD_TAG, payload: tag };
};

export const removeTag = (tag: string): Action => {
    return { type: ActionType.REMOVE_TAG, payload: tag };
};

export const startLoading = (): Action => {
    return { type: ActionType.START_LOADING, payload: null };
};

export const stopLoading = (): Action => {
    return { type: ActionType.STOP_LOADING, payload: null };
};

export const startSubmitting = (): Action => {
    return { type: ActionType.START_SUBMITTING, payload: null };
};

export const stopSubmitting = (): Action => {
    return { type: ActionType.STOP_SUBMITTING, payload: null };
};

export const populateForm = (formData: PostDetailsInputFormState): Action => {
    return { type: ActionType.POPULATE_FORM, payload: formData };
};