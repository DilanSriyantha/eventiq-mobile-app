import { ServiceProvider } from "@/common/types";
import { Action, ActionType } from "./types";

export const setTitle = (title: string): Action => {
    return { type: ActionType.SET_TITLE, payload: title };
};

export const setWelcomeNote = (welcomeNote: string): Action => {
    return { type: ActionType.SET_WELCOME_NOTE, payload: welcomeNote };
};

export const setBusinessEmail = (email: string): Action => {
    return { type: ActionType.SET_BUSINESS_EMAIL, payload: email };
};

export const setContactNumber = (contactNumber: string): Action => {
    return { type: ActionType.SET_CONTACT_NUMBER, payload: contactNumber };
};

export const setAddress = (address: string): Action => {
    return { type: ActionType.SET_ADDRESS, payload: address };
};

export const addTag = (tag: string): Action => {
    return { type: ActionType.ADD_TAG, payload: tag };
};

export const removeTag = (tag: string): Action => {
    return { type: ActionType.REMOVE_TAG, payload: tag };
};

export const populateForm = (initData: ServiceProvider): Action => {
    return { type: ActionType.POPULATE_FORM, payload: initData };
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