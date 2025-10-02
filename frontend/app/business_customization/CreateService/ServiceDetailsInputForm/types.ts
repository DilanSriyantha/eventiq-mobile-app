import { onComplete, onError } from "../../ManageBusinessInfo/BusinessDetailsInputForm/types";
import { ProviderServiceUpdateRequest } from "@/context/ProviderServicesProvider/types";

export interface ServiceDetailsInputFormProps {
    initialData?: ServiceDetailsInputFormState;
    onInitialize?: (notifyCompletion: onComplete, notifyError: onError) => void | Promise<void>;
    onSubmit?: (result: ServiceDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => void | Promise<void>;
    onDelete?: (error: (err: Error) => void) => void | Promise<void>;
};

export interface ServiceDetailsInputFormState extends Omit<ProviderServiceUpdateRequest, "providerEmail" | "serviceId" | "rate"> {
    loading: boolean;
    submitting: boolean;
};

export type ServiceDetailsInputFormResult = ServiceDetailsInputFormState;

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