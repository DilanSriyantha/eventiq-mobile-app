import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { CommentCompProps } from "./types";

function CommentComp(comment: CommentCompProps) {

    return (
        <View style={styles.commentContent}>
            <View style={styles.commentHeader}>
                <Avatar.Text
                    size={36}
                    label={comment.username.substring(0, 1)}
                />
                <Text variant="bodyLarge">{comment.username}</Text>
            </View>
            <View style={styles.commentBody}>
                <Text variant="bodyMedium">{comment.body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    commentContent: {
        gap: 10,
    },
    commentHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    commentBody: {

    },
});

export default memo(CommentComp);