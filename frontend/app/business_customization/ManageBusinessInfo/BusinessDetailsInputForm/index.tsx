import InputBlock from "@/app/EventCustomization/CreateEvent/EventDetailsInputForm/InputBlock";
import Validator from "@/app/utils/Validator";
import InputBox from "@/components/InputBox";
import { useSnackbar } from "@/context/SnackbarProvider";
import { memo, useCallback, useEffect, useReducer } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Chip } from "react-native-paper";
import { addTag, populateForm, removeTag, setAddress, setBusinessEmail, setContactNumber, setTitle, setWelcomeNote, startLoading, startSubmitting, stopLoading, stopSubmitting } from "./actions";
import reducer, { initialState } from "./reducer";
import { BusinessDetailsInputsFormProps } from "./types";

const BusinessDetailsInputForm = ({ initialData, onInitialize, onSubmit }: BusinessDetailsInputsFormProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const snackbar = useSnackbar();

    useEffect(() => {
        if (initialData) {
            dispatch(populateForm(initialData));
            return;
        }

        if (onInitialize) {
            dispatch(startLoading());
            onInitialize.apply(null, [onInitComplete, onInitError]);
        }
    }, []);

    const onInitComplete = (res: any) => {
        dispatch(populateForm(res));
    };

    const onInitError = (err: Error) => {
        console.log(err);
        snackbar.showError(err.message);
        dispatch(stopLoading());
    };

    const handleTitleChange = useCallback((text: string) => {
        dispatch(setTitle(text));
    }, []);

    const handleWelcomeNoteChange = useCallback((text: string) => {
        dispatch(setWelcomeNote(text));
    }, []);

    const handleContactNumberChange = useCallback((text: string) => {
        dispatch(setContactNumber(text))
    }, []);

    const handleAddressChange = useCallback((text: string) => {
        dispatch(setAddress(text));
    }, []);

    const handleBusinessEmailChange = useCallback((text: string) => {
        dispatch(setBusinessEmail(text));
    }, []);

    const handleAddTag = useCallback((text: string) => {
        dispatch(addTag(text));
    }, []);

    const handleRemoveTag = useCallback((tag: string) => {
        dispatch(removeTag(tag));
    }, []);

    function handleSubmit() {
        dispatch(startSubmitting());

        const areValid = Validator.areValid([
            state.title, Validator.ValueType.text,
            state.welcomeNote, Validator.ValueType.text,
            state.contactNumber, Validator.ValueType.telephone,
            state.businessEmail, Validator.ValueType.email,
            state.tags, Validator.ValueType.text
        ]);

        if (!areValid) {
            snackbar.showError("Invalid inputs.");
            return;
        }

        onSubmit?.apply(null, [state, onSubmitComplete, onSubmitError]);
    }

    const onSubmitComplete = useCallback(() => {
        snackbar.showSuccess("Business information updated successfully.");
        dispatch(stopSubmitting());
    }, []);

    const onSubmitError = useCallback((err: Error) => {
        console.log(err);
        snackbar.showError(err.message);
        dispatch(stopSubmitting());
    }, []);

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 80}
            style={styles.container}
        >
            {
                state.loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            animating
                            size={"large"}
                        />
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <InputBlock label="Business Name">
                            <InputBox.Text
                                value={state.title}
                                mode="outlined"
                                onTextChange={handleTitleChange}
                            />
                        </InputBlock>

                        <InputBlock label="Welcome Note">
                            <InputBox.Text
                                value={state.welcomeNote}
                                mode="outlined"
                                multiline
                                onTextChange={handleWelcomeNoteChange}
                            />
                        </InputBlock>

                        <InputBlock label="Contact Number">
                            <InputBox.Text
                                value={state.contactNumber}
                                mode="outlined"
                                onTextChange={handleContactNumberChange}
                            />
                        </InputBlock>

                        <InputBlock label="Address">
                            <InputBox.Text
                                value={state.address}
                                mode="outlined"
                                onTextChange={handleAddressChange}
                            />
                        </InputBlock>

                        <InputBlock label="Business Email">
                            <InputBox.Text
                                value={state.businessEmail}
                                mode="outlined"
                                onTextChange={handleBusinessEmailChange}
                            />
                        </InputBlock>

                        <InputBlock label="Tags">
                            <View style={styles.tagsContainer}>
                                {state.tags !== "" && state.tags.split(",").map((t, idx) => (
                                    <Chip
                                        key={idx}
                                        mode="outlined"
                                        onPress={() => handleRemoveTag(t)}
                                    >{t}</Chip>
                                ))}
                            </View>
                            <InputBox.Text
                                mode="outlined"
                                clearOnSubmit
                                onSubmit={handleAddTag}
                            />
                        </InputBlock>

                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={handleSubmit}
                            loading={state.submitting}
                            disabled={state.submitting}
                        >Save</Button>
                    </ScrollView>
                )
            }
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
    },
    tagsContainer: {
        flexWrap: "wrap",
        gap: 5,
        flexDirection: "row",
        paddingBottom: 10,
    },
    button: {
        borderRadius: 5,
        padding: 5,
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default memo(BusinessDetailsInputForm);