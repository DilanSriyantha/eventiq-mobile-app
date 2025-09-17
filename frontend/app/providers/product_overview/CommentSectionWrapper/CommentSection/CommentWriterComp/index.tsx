import { memo, useCallback, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import { IconButton, Surface, TextInput, useTheme } from "react-native-paper";
import { CommentWriterCompProps } from "./types";

function CommentWriterComp({ onSend }: CommentWriterCompProps) {
    const [comment, setComment] = useState("");

    const theme = useTheme();

    const handleInputChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setComment(e.nativeEvent.text);
    }, []);

    const handleSendPress = useCallback(() => {
        onSend.apply(null, [comment]);
    }, [comment]);

    return (
        <View style={styles.commentWriterContainer}>
            <Surface mode="flat" style={styles.commentWriterContent}>
                <View style={styles.commentWriterInput}>
                    <TextInput
                        mode="outlined"
                        placeholder="Say something..."
                        inputMode="text"
                        style={{ flex: 2 }}
                        value={comment}
                        onChange={handleInputChange}
                    />
                    <IconButton
                        icon={"send"}
                        iconColor={theme.colors.primary}
                        size={24}
                        onPress={handleSendPress}
                    />
                </View>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    commentWriterContainer: {

    },
    commentWriterContent: {
        padding: 20,
        borderRadius: 10,
    },
    commentWriterInput: {
        flex: 3,
        flexDirection: "row",
    }
});

export default memo(CommentWriterComp);