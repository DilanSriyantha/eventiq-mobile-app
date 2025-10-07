import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useReducer } from "react";
import { EventDetailsFormResult, EventDetailsInputFormHandle, EventDetailsInputFormProps } from "./types";
import reducer, { initialState } from "./reducer";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import InputBlock from "./InputBlock";
import InputBox from "@/components/InputBox";
import { clear, populateForm, setDate, setDescription, setTitle } from "./actions";
import { Button } from "react-native-paper";
import Validator from "@/app/utils/Validator";

const EventDetailsInputForm = forwardRef<EventDetailsInputFormHandle, EventDetailsInputFormProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
        clear: handleClear,
    }));

    useEffect(() => {
        const initialTitle = props.initialTitle;
        const initialDate = props.intialDate;
        const initialDescription = props.initialDescription;

        if (initialTitle && initialDate && initialDescription)
            dispatch(populateForm(initialTitle, initialDate, initialDescription));
    }, []);

    const handleTitleChange = useCallback((text: string): void => {
        dispatch(setTitle(text))
    }, []);

    const handleDateChange = useCallback((date: Date | undefined) => {
        if (!date) return;

        console.log(date);

        dispatch(setDate(date));
    }, []);

    const handleDescriptionChange = useCallback((text: string): void => {
        dispatch(setDescription(text));
    }, []);

    function handleSubmit() {
        const areValid = Validator.areValid(
            state.title, Validator.ValueType.text,
            state.date, Validator.ValueType.except,
            state.description, Validator.ValueType.text
        );

        if (!areValid) return null;

        if (props.onSubmit)
            props.onSubmit.apply(null, [state as EventDetailsFormResult]);

        return state as EventDetailsFormResult;
    }

    const handleClear = useCallback(() => {
        dispatch(clear());
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            style={styles.container}
        >
            <InputBlock label="Title">
                <InputBox.Text
                    value={state.title}
                    mode="outlined"
                    onTextChange={handleTitleChange}
                />
            </InputBlock>

            <InputBlock label="Date">
                <InputBox.Date
                    date={state.date}
                    onDateChange={handleDateChange}
                />
            </InputBlock>

            <InputBlock label="Description">
                <InputBox.Text
                    mode="outlined"
                    inputMode="text"
                    multiline
                    numberOfLines={5}
                    value={state.description}
                    onTextChange={handleDescriptionChange}
                    style={{ paddingVertical: 10, }}
                />
            </InputBlock>

            <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit}
                loading={props.loading}
                disabled={props.loading}
            >
                Submit
            </Button>
        </KeyboardAvoidingView>
    );
});

const styles = StyleSheet.create({
    container: {
        gap: 15
    },
    button: {
        padding: 5,
        borderRadius: 5,
    }
});

export default memo(EventDetailsInputForm);