import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { PostDetailsInputFormProps } from "./types";
import { memo, useCallback, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import InputBlock from "@/app/EventCustomization/CreateEvent/EventDetailsInputForm/InputBlock";
import InputBox from "@/components/InputBox";
import { addTag, populateForm, removeTag, setDescription, setImageUrl, setTitle, startLoading, startSubmitting, stopLoading, stopSubmitting } from "./actions";
import { ActivityIndicator, Button, Chip, useTheme } from "react-native-paper";
import Validator from "@/app/utils/Validator";
import { useSnackbar } from "@/context/SnackbarProvider";

const PostDetailsInputForm = ({ initialData, onInitialize, onSubmit, onDelete }: PostDetailsInputFormProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const theme = useTheme();
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

    const onInitComplete = useCallback((res: any) => {
        dispatch(populateForm(res));
    }, []);

    const onInitError = useCallback((err: Error) => {
        console.log(err);
        snackbar.showError(err.message);
        dispatch(stopLoading());
    }, []);

    const handleImageChange = useCallback((text: string) => {
        dispatch(setImageUrl(text));
    }, []);

    const handleTitleChange = useCallback((text: string) => {
        dispatch(setTitle(text));
    }, []);

    const handleDescriptionChange = useCallback((text: string) => {
        dispatch(setDescription(text));
    }, []);

    const handleAddTag = useCallback((text: string): void => {
        dispatch(addTag(text));
    }, []);

    const handleRemoveTag = useCallback((text: string): void => {
        dispatch(removeTag(text));
    }, []);

    const handleSubmit = () => {
        dispatch(startSubmitting());

        const areValid = Validator.areValid([
            state.title, Validator.ValueType.text,
            state.description, Validator.ValueType.text,
            state.tags, Validator.ValueType.text,
            state.imageUrl, Validator.ValueType.text,
        ]);

        if (!areValid) {
            snackbar.showError("Invalid inputs.");
            return;
        }

        onSubmit?.apply(null, [state, onSubmitComplete, onSubmitError]);
    };

    const handleDelete = useCallback(() => {
        dispatch(startLoading());

        onDelete?.apply(null, [onDeleteError]);
    }, []);

    const onDeleteError = useCallback((err: Error) => {
        console.log(err);
        snackbar.showError(err.message);
        dispatch(stopLoading());
    }, []);

    const onSubmitComplete = useCallback(() => {
        snackbar.showSuccess("Post created successfully.");
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
                        <InputBlock label="Cover Image">
                            {/* <InputBox.Text
                                value={state.imageUrl}
                                mode="outlined"
                                onTextChange={handleImageChange}
                            /> */}
                            <InputBox.ImagePicker
                                sourceUri={state.imageUrl}
                            />
                        </InputBlock>

                        <InputBlock label="Title">
                            <InputBox.Text
                                value={state.title}
                                mode="outlined"
                                onTextChange={handleTitleChange}
                            />
                        </InputBlock>

                        <InputBlock label="Description">
                            <InputBox.Text
                                value={state.description}
                                mode="outlined"
                                onTextChange={handleDescriptionChange}
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
                                clearOnSubmit
                                mode="outlined"
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

                        {
                            onDelete && (
                                <Button
                                    mode="contained"
                                    style={{ ...styles.button, backgroundColor: theme.colors.error }}
                                    onPress={handleDelete}
                                    loading={state.loading}
                                >Delete</Button>
                            )
                        }
                    </ScrollView>
                )
            }
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        padding: 5,
    },
    contentContainer: {
        gap: 15,
        paddingBottom: 20,
    },
    tagsContainer: {
        flexWrap: "wrap",
        gap: 5,
        flexDirection: "row",
        paddingBottom: 10,
    },
});

export default memo(PostDetailsInputForm);