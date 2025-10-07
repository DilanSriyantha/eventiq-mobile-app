import { ServiceProvider } from "@/context/ServiceProvidersProvider/types";

export interface BusinessDetailsInputsFormProps {
    initialData?: ServiceProvider;
    onInitialize?: (notifyCompletion: onComplete, notifyError: onError) => void | Promise<void>;
    onSubmit?: (result: BusinessDetailsInputsFormState, notifyCompletion: onComplete, notifyError: onError) => void | Promise<void>;
};

export type onComplete = (res?: any) => void;

export type onError = (e: Error) => void;

export interface BusinessDetailsInputsFormState extends Omit<ServiceProvider, "id" | "name" | "createdAt" | "updatedAt" | "rating"> {
    loading: boolean;
    submitting: boolean;
};

export type BusinessDetailsInputsFormResult = BusinessDetailsInputsFormState;

export enum ActionType {
    START_LOADING,
    STOP_LOADING,
    START_SUBMITTING,
    STOP_SUBMITTING,
    SET_TITLE,
    SET_BUSINESS_EMAIL,
    SET_CONTACT_NUMBER,
    SET_ADDRESS,
    SET_WELCOME_NOTE,
    ADD_TAG,
    REMOVE_TAG,
    POPULATE_FORM,
};

export type Action = { type: ActionType, payload: any };