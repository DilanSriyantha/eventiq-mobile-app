import { AnimatedInputHandle, AnimatedInputProps, AnimatedRegistrationFormProps } from "@/types/types";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { FAB, Text, TextInput } from "react-native-paper";
import { Easing, runOnJS, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

const WINDOW_WIDTH = Dimensions.get("window").width;

export default function AnimatedRegistrationForm(props: AnimatedRegistrationFormProps) {
    const emailInputRef = useRef<AnimatedInputHandle>(null);
    const passwordInputRef = useRef<AnimatedInputHandle>(null);

    useEffect(() => {
        if (emailInputRef.current !== null)
            emailInputRef.current.in();
    }, []);

    function handleNext() {
        if (emailInputRef.current === null || passwordInputRef.current === null) return;

        emailInputRef.current?.out();
        passwordInputRef.current?.in();

        if (passwordInputRef.current.isShowing())
            props.onFinished();
    }

    function handlePrevious() {
        emailInputRef.current?.in();
        passwordInputRef.current?.reset();
    }

    const AnimatedInput = forwardRef<AnimatedInputHandle, AnimatedInputProps>((props, ref) => {
        const [posX, setPosX] = useState<number>(-WINDOW_WIDTH);

        const posXShared = useSharedValue(-WINDOW_WIDTH);

        useImperativeHandle(ref, () => ({
            in: handleIn,
            out: handleOut,
            reset: handleReset,
            isShowing: () => { return posX === 0 }
        }));

        function handleIn() {
            posXShared.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.quad) });
        }

        function handleOut() {
            posXShared.value = withTiming(WINDOW_WIDTH, { duration: 500, easing: Easing.inOut(Easing.quad) });
        }

        function handleReset() {
            posXShared.value = withTiming(-WINDOW_WIDTH, { duration: 500, easing: Easing.inOut(Easing.quad) });
        }

        useDerivedValue(() => {
            runOnJS(setPosX)(posXShared.value);
        }, [posXShared]);

        return (
            <View style={{ position: "absolute", width: "100%", transform: [{ translateX: posX }] }}>
                <Text variant="headlineMedium" style={styles.header}>{props.title}</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        mode="outlined"
                        onChangeText={props.onTextChange}
                    />
                </View>
            </View>
        );
    });

    return (
        <>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={0}
            >
                <View style={styles.animatedInputsContainer}>
                    <AnimatedInput title="Enter your email here..." ref={emailInputRef} onTextChange={props.onEmailChanged} />
                    <AnimatedInput title="Enter your password here..." ref={passwordInputRef} onTextChange={props.onPasswordChanged} />
                </View>

                <View style={styles.bottomActionsContainer}>
                    <FAB variant="surface" mode="flat" icon={"arrow-left"} onPress={handlePrevious} />
                    <FAB label="Next" mode="flat" icon={"arrow-right"} onPress={handleNext} />
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
    textInputContainer: {
        marginTop: 50,
    },
    header: {
        fontWeight: "500",
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