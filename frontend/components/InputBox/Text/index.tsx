import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputSubmitEditingEventData } from "react-native";
import { TextInput } from "react-native-paper";
import { TextHandle, TextProps } from "../types";

const Text = forwardRef<TextHandle, TextProps>((props, ref) => {
    const [text, setText] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(props.secureTextEntry ? true : false);

    useImperativeHandle(ref, () => ({
        setText: handleSetText,
        getText: handleGetText,
        clear: handleClear,
    }));

    useEffect(() => {
        if (!props.value) return;

        setText(props.value);
    }, [props.value]);

    const handleChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        setText(e.nativeEvent.text);
        props.onTextChange?.apply(null, [e.nativeEvent.text]);
    }, []);

    const handleSubmitEditing = useCallback((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
        props.onSubmit?.apply(null, [e.nativeEvent.text]);
    }, []);

    const handleSetText = useCallback((txt: string) => {
        setText(txt);
    }, []);

    const handleGetText = useCallback((): string => {
        return text;
    }, [text]);

    const handleClear = useCallback(() => {
        setText("");
    }, []);

    return (
        <TextInput
            {...props}
            secureTextEntry={showPassword}
            onChange={handleChange}
            onSubmitEditing={handleSubmitEditing}
            value={text}
            right={props.passwordShowHideEnabled && (
                <TextInput.Icon
                    icon={showPassword ? "eye" : "eye-off"}
                    onPress={() => setShowPassword(!showPassword)}
                />
            )}
        />
    );
});

export default memo(Text);