import Validator from "@/app/utils/Validator";
import { LoginFormResult, PlainLoginFormState } from "./types";

export const validateAndGenerateResult = (state: PlainLoginFormState): LoginFormResult | null => {
    const loginFormResult: LoginFormResult = state;

    const valid = Validator.areValid(
        loginFormResult.email, Validator.ValueType.email,
        loginFormResult.password, Validator.ValueType.text
    );

    if (!valid) return null;

    return loginFormResult;
};