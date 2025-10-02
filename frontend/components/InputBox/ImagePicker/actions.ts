import { Action, ActionType } from "./types";

export const setImageUri = (imageUri: string): Action => {
    return { type: ActionType.SET_IMAGE_URI, payload: imageUri };
};