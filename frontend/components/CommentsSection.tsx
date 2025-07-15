import { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface CommentSectionProps {

};

export interface Comment {
    userImg: string;
    user: string;
    description: string;
};

function CommentSection({...props}: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);

    const renderComment = (comment: Comment) => (
        <View>
            <Avatar

            />
        </View>
    );

    return (
        <View>
            <Text variant="titleLarge">Comment Section</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default memo(CommentSection);