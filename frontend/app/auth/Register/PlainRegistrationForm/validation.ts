import Validator from "@/app/utils/Validator";
import { PlainRegistrationFormState, RegisterFormResult } from "./types";

export function validateAndGenerateResult(state: PlainRegistrationFormState): RegisterFormResult | null {
    const registerFormResult: RegisterFormResult = {
        name: state.userName,
        email: state.email,
        password: state.password
    };

    const valid = Validator.areValid(
        registerFormResult.name, Validator.ValueType.text,
        registerFormResult.email, Validator.ValueType.email,
        registerFormResult.password, Validator.ValueType.text
    );

    if (!valid) return null;

    return registerFormResult;
}