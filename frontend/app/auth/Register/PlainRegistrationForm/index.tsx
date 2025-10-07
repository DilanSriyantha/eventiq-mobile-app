import { Role } from "@/app/enums/Role";
import InputBox from "@/components/InputBox";
import { DropdownItem } from "@/components/InputBox/types";
import { Link } from "expo-router";
import { forwardRef, memo, useCallback, useImperativeHandle, useReducer } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { clear, setEmail, setPassword, setPasswordRepeat, setRole, setUsername } from "./actions";
import { initialState, reducer } from "./reducer";
import { PlainRegistrationFormHandle, PlainRegistrationFormProps } from "./types";
import { validateAndGenerateResult } from "./validation";

const ACCOUNT_TYPE_OPTIONS: DropdownItem[] = [
    { label: "Consumer", value: "CONSUMER" },
    { label: "Service Provider", value: "PROVIDER" },
];

const PlainRegistrationForm = forwardRef<PlainRegistrationFormHandle, PlainRegistrationFormProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const theme = useTheme();

    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
        clear: handleClear
    }));

    const handleSubmit = useCallback(() => {
        const validatedFormResult = validateAndGenerateResult(state);

        props.onSubmit?.apply(null, [validatedFormResult]);

        return validatedFormResult;
    }, [state]);

    const handleClear = useCallback(() => {
        dispatch(clear());
    }, []);

    const handleAccountTypeChange = useCallback((item: DropdownItem, _idx: number): void => {
        const role = Role.of(item.value);

        console.log(role);

        if (!role) return;

        dispatch(setRole(role));
    }, []);

    const handleUsernameChange = useCallback((text: string): void => {
        dispatch(setUsername(text));
    }, []);

    const handleEmailChange = useCallback((text: string): void => {
        dispatch(setEmail(text));
    }, []);

    const handlePasswordChange = useCallback((text: string): void => {
        dispatch(setPassword(text));
    }, []);

    const handlePasswordRepeatChange = useCallback((text: string): void => {
        dispatch(setPasswordRepeat(text));
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            {...props}
        >
            <View style={styles.inputBlock}>
                <View style={styles.labelContainer}>
                    <Text variant="labelLarge">Account Type</Text>
                </View>
                <InputBox.Dropdown
                    data={ACCOUNT_TYPE_OPTIONS}
                    onSelect={handleAccountTypeChange}
                />
            </View>
            <View style={styles.inputBlock}>
                <View style={styles.labelContainer}>
                    <Text variant="labelLarge">Username</Text>
                </View>
                <InputBox.Text mode="outlined" onTextChange={handleUsernameChange} />
            </View>
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
            <View style={styles.inputBlock}>
                <View style={styles.labelContainer}>
                    <Text variant="labelLarge">Confirm Password</Text>
                </View>
                <InputBox.Text mode="outlined" secureTextEntry passwordShowHideEnabled onTextChange={handlePasswordRepeatChange} error={state.passwordRepeatError} />
            </View>

            <Button mode="contained" style={styles.button} onPress={handleSubmit} loading={props.loading} disabled={props.loading}>Submit</Button>

            <View style={styles.message}>
                <Text variant="bodyLarge" style={{ textAlign: "center" }}>Creating an account means you are okay with our terms of services and out Privacy Policy.</Text>
                <Text variant="bodyLarge" style={{ textAlign: "center" }}>Have an account? <Link href={"/auth/login"} style={{ color: theme.colors.primary }}>Sign in</Link></Text>
            </View>
        </KeyboardAvoidingView>
    );
})

const styles = StyleSheet.create({
    inputBlock: {
    },
    labelContainer: {
        paddingBottom: 5,
    },
    button: {
        borderRadius: 5,
        padding: 5,
    },
    message: {

    }
});

export default memo(PlainRegistrationForm);