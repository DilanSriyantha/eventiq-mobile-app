export interface AnimatedRegistrationFormProps {
    onFinished: (formResult: RegisterFormResult | LoginFormResult) => void | Promise<void>;
    loading: boolean;
    mode: "login" | "register";
};

export interface RegisterFormResult {
    name: string;
    email: string;
    password: string;
};

export interface LoginFormResult {
    email: string;
    password: string;
};