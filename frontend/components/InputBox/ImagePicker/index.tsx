import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useReducer } from "react";
import { ImagePickerHandle, ImagePickerProps } from "./types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { initialState, reducer } from "./reducer";
import * as DocumentPicker from "expo-document-picker";
import { setImageUri } from "./actions";
import { useSnackbar } from "@/context/SnackbarProvider";

const ImagePicker = forwardRef<ImagePickerHandle, ImagePickerProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const theme = useTheme();
    const snackbar = useSnackbar();

    useImperativeHandle(ref, (() => ({
        setImageUri: handleSetImageUri,
        getLocalUri: handleGetLocalUri
    })));

    useEffect(() => {
        if (!props.sourceUri) return;

        dispatch(setImageUri(props.sourceUri));
    }, [props.sourceUri]);

    const handleSetImageUri = useCallback((imageUri: string) => {
        dispatch(setImageUri(imageUri));
    }, []);

    const handleGetLocalUri = useCallback(() => {
        return state.imageUri;
    }, [state.imageUri]);

    const handleSelectImagePress = useCallback(() => {
        pickImage();
    }, []);

    const pickImage = useCallback(async () => {
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: "image/*",
                copyToCacheDirectory: true,
            });

            if (!res.canceled) {
                const imageUri = res.assets[0].uri;
                console.log(imageUri);
                dispatch(setImageUri(imageUri));
                props.onChange?.apply(null, [imageUri]);
            } else {
                snackbar.showInfo("Document picking cancelled");
            }
        } catch (err) {
            console.log(err);
            snackbar.showError("Error picking document");
        }
    }, []);

    return (
        <View style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
            outlineColor: theme.colors.outline,
            height: props.height ? props.height : 200
        }}>
            <TouchableOpacity style={{ flex: 1, flexWrap: "wrap" }} onPress={handleSelectImagePress}>
                {
                    state.imageUri === "" ? (
                        <View style={styles.noteContainer}>
                            <Icon
                                source={"image-outline"}
                                size={24}
                                color={theme.colors.outlineVariant}
                            />
                            <Text
                                variant="labelMedium"
                                style={{ color: theme.colors.outlineVariant }}
                            >Select an image</Text>
                        </View>
                    ) : (
                        <Image
                            source={{ uri: state.imageUri }}
                            style={{
                                height: props.height ? props.height - 10 : 190,
                                width: "100%",
                                resizeMode: props.resizeMode ? props.resizeMode : "cover",
                            }}
                        />
                    )
                }
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: .8,
        borderRadius: 5,
        padding: 5,
    },
    noteContainer: {
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default memo(ImagePicker);