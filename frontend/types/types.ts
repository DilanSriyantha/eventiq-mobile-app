export interface WelcomeAnimationProps {
    onGetStartedPress?: () => void;
};

export interface AnimatedRegistrationFormProps {
    onEmailChanged: (email: string) => void;
    onPasswordChanged: (password: string) => void;
    onFinished: () => void;
}

export interface AnimatedInputHandle {
    in: () => void;
    out: () => void;
    reset: () => void;
    isShowing: () => boolean;
}

export interface AnimatedInputProps {
    title: string;
    onTextChange: (text: string) => void;
}

export interface SearchBoxProps {
    onTextChange: (text: string) => void;
}