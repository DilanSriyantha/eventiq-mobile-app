export interface DateInputState {
    date: Date;
    visible: boolean;
};

export enum ActionType {
    SET_DATE,
    SHOW_CALENDAR,
    HIDE_CALENDAR,
};

export type Action = { type: ActionType, payload: any };