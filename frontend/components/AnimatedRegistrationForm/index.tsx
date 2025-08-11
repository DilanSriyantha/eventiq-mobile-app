import { useCallback, useEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import AnimatedInput, { AnimatedInputHandle } from "./AnimatedInput";
import Validator from "@/app/utils/Validator";
import { useSnackbar } from "@/context/SnackbarProvider";

interface AnimatedRegistrationFormProps {
    onFinished: (formResult: FormResult) => void | Promise<void>;
    loading: boolean;
};

export interface FormResult {
    name: string;
    email: string;
    password: string;
};

export default function AnimatedRegistrationForm(props: AnimatedRegistrationFormProps) {
    const nameInputRef = useRef<AnimatedInputHandle>(null);
    const emailInputRef = useRef<AnimatedInputHandle>(null);
    const passwordInputRef = useRef<AnimatedInputHandle>(null);

    const currentInput = useRef<string>("name");

    const snackbar = useSnackbar();

    useEffect(() => {
        if (nameInputRef.current !== null)
            nameInputRef.current.in();
    }, []);

    function handleNext() {
        if (nameInputRef.current === null || emailInputRef.current === null || passwordInputRef.current === null) return;

        if (currentInput.current === "name") {
            nameInputRef.current?.out();
            emailInputRef.current?.in();
            currentInput.current = "email";
        } else if (currentInput.current === "email") {
            emailInputRef.current?.out();
            passwordInputRef.current?.in();
            currentInput.current = "password";
        } else {
            handleFinish();
        }
    }

    function handlePrevious() {
        nameInputRef.current?.in();
        emailInputRef.current?.reset();
        passwordInputRef.current?.reset();
        currentInput.current = "name";
    }

    const handleFinish = useCallback(() => {
        if (nameInputRef.current === null || emailInputRef.current === null || passwordInputRef.current === null) return;

        const result: FormResult = {
            name: nameInputRef.current.getInput(),
            email: emailInputRef.current.getInput(),
            password: passwordInputRef.current.getInput()
        };

        const isValid = Validator.areValid(
            result.name, Validator.ValueType.text,
            result.email, Validator.ValueType.email,
            result.password, Validator.ValueType.text
        );

        if (!isValid) {
            snackbar.showError("Invalid inputs are detected.");

            return;
        }

        props.onFinished.apply(null, [result]);
    }, []);

    return (
        <>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                <View style={styles.animatedInputsContainer}>
                    <AnimatedInput
                        title="Enter your name here..."
                        ref={nameInputRef}
                        inputMode={"text"}
                    />
                    <AnimatedInput
                        title="Enter your email here..."
                        ref={emailInputRef}
                        inputMode={"email"}
                        keyboardType={"email-address"}
                    />
                    <AnimatedInput
                        title="Enter your password here..."
                        ref={passwordInputRef}
                        inputMode={"text"}
                        keyboardType={"visible-password"}
                        secureTextEntry
                    />
                </View>

                <View style={styles.bottomActionsContainer}>
                    <FAB variant="surface" mode="flat" icon={"arrow-left"} onPress={handlePrevious} />
                    <FAB label="Next" mode="flat" icon={"arrow-right"} loading={props.loading} onPress={handleNext} />
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    animatedInputsContainer: {
        height: "100%",
        flex: 1,
        zIndex: 10,
        // backgroundColor: "red",
    },
    bottomActionsContainer: {
        flex: 1,
        // backgroundColor: "green",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 50
    },
});