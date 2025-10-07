import { Action, ActionType, BusinessDetailsInputsFormState } from "./types";

export const initialState: BusinessDetailsInputsFormState = {
    infoId: -1,
    title: "",
    businessEmail: "",
    contactNumber: "",
    address: "",
    welcomeNote: "",
    tags: "",
    loading: false,
    submitting: false,
};

const reducer = (state: BusinessDetailsInputsFormState, action: Action): BusinessDetailsInputsFormState => {
    switch (action.type) {
        case ActionType.SET_TITLE:
            return { ...state, title: action.payload };

        case ActionType.SET_BUSINESS_EMAIL:
            return { ...state, businessEmail: action.payload };

        case ActionType.SET_CONTACT_NUMBER:
            return { ...state, contactNumber: action.payload };

        case ActionType.SET_ADDRESS:
            return { ...state, address: action.payload };

        case ActionType.SET_WELCOME_NOTE:
            return { ...state, welcomeNote: action.payload };

        case ActionType.ADD_TAG:
            if (state.tags === "")
                return { ...state, tags: action.payload };

            const tmp_tags_1 = state.tags.trim().split(",");
            tmp_tags_1.push(action.payload);

            return { ...state, tags: tmp_tags_1.join(",") }

        case ActionType.REMOVE_TAG:
            const tmp_tags_2 = state.tags.trim().split(",").filter((tag) => tag !== action.payload.trim()).join(",");

            return { ...state, tags: tmp_tags_2 };

        case ActionType.POPULATE_FORM:
            return { ...state, infoId: action.payload.infoId, title: action.payload.title, businessEmail: action.payload.businessEmail, address: action.payload.address, contactNumber: action.payload.contactNumber, welcomeNote: action.payload.welcomeNote, tags: action.payload.tags, loading: false };

        case ActionType.START_LOADING:
            return { ...state, loading: true };

        case ActionType.STOP_LOADING:
            return { ...state, loading: false };

        case ActionType.START_SUBMITTING:
            return { ...state, submitting: true };

        case ActionType.STOP_SUBMITTING:
            return { ...state, submitting: false };

        default:
            return state;
    }
}

export default reducer;