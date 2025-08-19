import InputBox from "@/components/InputBox";
import { forwardRef, memo, useCallback, useImperativeHandle, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { clear, setEmail, setPassword } from "./actions";
import { initialState, reducer } from "./reducer";
import { PlainLoginFormHandle, PlainLoginFormProps } from "./types";
import { validateAndGenerateResult } from "./validation";

const PlainLoginForm = forwardRef<PlainLoginFormHandle, PlainLoginFormProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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
        <View style={styles.container}>
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
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
    },
    inputBlock: {
    },
    labelContainer: {
        paddingBottom: 5,
    },
});

export default memo(PlainLoginForm);