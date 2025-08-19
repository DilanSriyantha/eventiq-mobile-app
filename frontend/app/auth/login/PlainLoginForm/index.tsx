import InputBox from "@/components/InputBox";
import { Link } from "expo-router";
import { forwardRef, memo, useCallback, useImperativeHandle, useReducer } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { clear, setEmail, setPassword } from "./actions";
import { initialState, reducer } from "./reducer";
import { PlainLoginFormHandle, PlainLoginFormProps } from "./types";
import { validateAndGenerateResult } from "./validation";

const PlainLoginForm = forwardRef<PlainLoginFormHandle, PlainLoginFormProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
        clear: handleClear,
    }));

    const handleSubmit = useCallback(() => {
        const validatedFormResult = validateAndGenerateResult(state);

        props.onSubmit?.apply(null, [validatedFormResult]);

        return validatedFormResult;
    }, [state]);

    const handleClear = useCallback(() => {
        dispatch(clear());
    }, []);

    const handleEmailChange = useCallback((text: string) => {
        dispatch(setEmail(text));
    }, []);

    const handlePasswordChange = useCallback((text: string) => {
        dispatch(setPassword(text));
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            {...props}
        >
            <View style={styles.inputBlock}>
                <View style={styles.labelContainer}>
                    <Text variant="labelLarge">Email</Text>
                </View>
                <InputBox.Text mode="outlined" onTextChange={handleEmailChange} />
            </View>
            <View style={styles.inputBlock}>
                <View style={styles.labelContainer}>
                    <Text variant="labelLarge">Password</Text>
                </View>
                <InputBox.Text mode="outlined" secureTextEntry passwordShowHideEnabled onTextChange={handlePasswordChange} />
            </View>

            <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit}
                loading={props.loading}
                disabled={props.loading}
            >
                Sign in
            </Button>

            <Text variant="bodyLarge" style={{ textAlign: "center" }}>Haven't an account? <Link href={"/auth/register"} style={{ color: theme.colors.primary }}>Sign up</Link></Text>
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    inputBlock: {
    },
    labelContainer: {
        paddingBottom: 5,
    },
    button: {
        padding: 5,
        borderRadius: 5,
    },
});

export default memo(PlainLoginForm);