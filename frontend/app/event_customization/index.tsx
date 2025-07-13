import { useCallback, useReducer, useState } from "react";
import { KeyboardAvoidingView, NativeSyntheticEvent, Platform, ScrollView, StyleSheet, TextInputChangeEventData, View } from "react-native";
import { Button, Card, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

interface CreateEventState {
    title: string;
    date: Date;
    description: string;
};

const initialState: CreateEventState = {
    title: "",
    date: new Date(),
    description: ""
};

enum ActionType {
    CHANGE_TITLE,
    CHANGE_DATE,
    CHANGE_DESCRIPTION,
};

const reducer = (state: CreateEventState, action: { type: ActionType, payload: any }): CreateEventState => {
    switch(action.type){
        case ActionType.CHANGE_TITLE:
            return { ...state, title: action.payload };
        case ActionType.CHANGE_DATE:
            return { ...state, date: action.payload };
        case ActionType.CHANGE_DESCRIPTION:
            return { ...state, description: action.payload };
        default:
            return state;
    }
};

export default function CreateEvent() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const theme = useTheme();

    const setTitle = useCallback((text: string) => {
        dispatch({ type: ActionType.CHANGE_TITLE, payload: text })
    }, [state.title]);

    const setDate = useCallback((date: Date | undefined) => {
        if(!date) return;

        dispatch({ type: ActionType.CHANGE_DATE, payload: date });
    }, [state.date]);

    const setDescription = useCallback((description: string) => {
        dispatch({ type: ActionType.CHANGE_DESCRIPTION, payload: description });
    }, [state.description]);

    const handleSubmit = useCallback(() => {
        console.log(state);
    }, [state.title, state.date, state.description]);

    return (
        <View style={{...styles.container, backgroundColor: theme.colors.background}}>
            <KeyboardAvoidingView
                style={{ ...styles.content, backgroundColor: theme.colors.background }}
                behavior={"padding"}
            >
                <View style={styles.formContainer}>
                    <View style={{ gap: 10 }}>
                        <TextInput mode="outlined" inputMode="text" label="Title" value={state.title} onChange={(e) => setTitle(e.nativeEvent.text)} />
                        <DatePickerInput
                            mode="outlined"
                            locale="en"
                            label="Date"
                            value={state.date}
                            onChange={(d) => setDate(d)}
                            inputMode="start"
                        />
                        <TextInput mode="outlined" inputMode="text" label="Description" multiline dense numberOfLines={5} value={state.description} onChange={(e) => setDescription(e.nativeEvent.text)} />
                    </View>
                </View>
                <View>
                    <Button mode="contained" onPress={handleSubmit}>Submit</Button>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 10,
        marginBottom: 60
    },
    formContainer: {
        flex: 1,
    },
});