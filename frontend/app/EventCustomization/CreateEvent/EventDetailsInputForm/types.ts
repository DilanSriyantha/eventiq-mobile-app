export type EventDetailsFormResult = EventDetailsInputFormState;

export type EventDetailsInputFormHandle = {
    submit: () => EventDetailsFormResult | null;
    clear: () => void;
};

export interface EventDetailsInputFormProps {
    loading?: boolean;
    initialTitle?: string;
    intialDate?: Date;
    initialDescription?: string;
    onSubmit?: (formResult: EventDetailsFormResult | null) => void;
    onClear?: () => void;
};

export interface EventDetailsInputFormState {
    title: string;
    date: Date;
    description: string;
};

export enum ActionType {
    SET_TITLE,
    SET_DATE,
    SET_DESCRIPTION,
    POPULATE_FORM,
    CLEAR,
};

export type Action = { type: ActionType, payload: any };