import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, TextInputSubmitEditingEventData, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { SearchBoxHandle, SearchBoxProps } from "./types";

const SearchBox = forwardRef<SearchBoxHandle, SearchBoxProps>(({ onSubmit }, ref) => {
    const [text, setText] = useState<string>("");

    useImperativeHandle(ref, () => ({
        setText: handleSetText,
        getText: handleGetText,
        reset: handleReset,
    }));

    const handleSetText = useCallback((txt: string) => {
        setText(txt);
    }, []);

    const handleGetText = useCallback(() => {
        return text;
    }, [text]);

    const handleReset = useCallback(() => {
        setText("");
    }, []);

    const handleTextChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        setText(e.nativeEvent.text);
    }, []);

    const handleSubmitEditing = useCallback((_e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
        onSubmit?.apply(null, [text]);
    }, [text]);

    const handleClear = useCallback(() => {
        setText("");
        onSubmit?.apply(null, [""]);
    }, []);

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder={"Seach..."}
                onChange={handleTextChange}
                value={text}
                onSubmitEditing={handleSubmitEditing}
                onClearIconPress={handleClear}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
    },
});

export default memo(SearchBox);