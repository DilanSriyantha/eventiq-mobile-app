import { memo, useCallback, useEffect, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View } from "react-native";
import { Avatar, Divider, IconButton, Surface, Text, TextInput, useTheme } from "react-native-paper";

interface CommentSectionProps {

};

export interface Comment {
    userImg: string;
    user: string;
    description: string;
};

const comment: Comment = {
    userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR89kf05Hxig-2BCdJM8glcnAIUTbIljzWinA&s",
    user: "Norman Reedus",
    description: "Ain't my fucking problem!",
};

function CommentSection({...props}: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [userComment, setUserComment] = useState<string>("");

    const theme = useTheme();

    useEffect(() => {
        setComments([comment, comment, comment]);
    }, []);

    const handleSendPress = useCallback(() => {

    }, []);

    const handleInputChange = useCallback((value: string) => {
        setUserComment(value);
    }, [userComment]);

    const renderComment = (comment: Comment, key: number) => (
        <View style={styles.commentContent} key={key}>
            <View style={styles.commentHeader}>
                <Avatar.Image
                    source={{uri: comment.userImg}}
                    size={24}
                />
                <Text variant="bodyLarge">{comment.user}</Text>
            </View>
            <View style={styles.commentBody}>
                <Text variant="bodyMedium">{comment.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.commentsContainer}>
                {
                    comments.map((comment, idx) => (
                        <View key={idx} style={styles.commentContent}>
                            {renderComment(comment, idx)}
                            {(idx !== comments.length - 1) && <Divider key={`divider-${idx}`} />}
                        </View>
                    ))
                }
            </View>
            <View style={styles.commentWriterContainer}>
                <Surface mode="flat" style={styles.commentWriterContent}>
                    <View style={styles.commentWriterInput}>
                        <TextInput 
                            mode="outlined" 
                            placeholder="Say something..." 
                            inputMode="text" 
                            style={{ flex: 2 }} 
                            value={userComment} 
                            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => handleInputChange(e.nativeEvent.text)}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    commentsContainer: {
        gap: 15,
    },
    commentContent: {
        gap: 10,
    },
    commentHeader: {
        flexDirection: "row",
        gap: 10,
    },
    commentBody: {

    },
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

export default memo(CommentSection);