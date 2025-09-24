import { useComments } from "@/context/CommentsProvider";
import { CreateCommentRequest } from "@/context/CommentsProvider/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { memo, useCallback, useEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { addComment, setComments, startLoading } from "./actions";
import CommentComp from "./CommentComp";
import CommentWriterComp from "./CommentWriterComp";
import reducer, { initialState } from "./reducer";
import { CommentSectionProps } from "./types";

function CommentSection({ serviceId }: CommentSectionProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [user, setUser] = useCurrentUser();

    const comments = useComments();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = useCallback(async () => {
        dispatch(startLoading());

        try {
            const c = await comments.getAll(serviceId);

            dispatch(setComments(c));
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    const handleSendComment = useCallback(async (comment: string) => {
        if (!user) {
            snackbar.showError("Please sign in to proceed this action.");

            return;
        }

        try {
            const req: CreateCommentRequest = {
                userEmail: user.email,
                serviceId: serviceId,
                commentBody: comment
            };

            const res = await comments.create(req);

            dispatch(addComment(res));

            snackbar.showSuccess("Comment created successfully.");
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error ocurred");
        }
    }, []);

    return (
        <>
            {
                state.loading ? (
                    <ActivityIndicator
                        animating
                        size={"small"}
                    />
                ) : (
                    <View style={styles.container}>
                        {
                            state.comments.map((c, idx) => (
                                <View key={idx}>
                                    <CommentComp {...c} key={`commentcomp-${c.id}-${idx}`} />
                                    {
                                        idx !== state.comments.length - 1 && (
                                            <Divider key={`divider-${idx}-${c.id}`} />
                                        )
                                    }
                                </View>
                            ))
                        }
                        <View style={styles.commentWriterContainer}>
                            <CommentWriterComp onSend={handleSendComment} />
                        </View>
                    </View>
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    commentWriterContainer: {
        paddingTop: 10,
    }
});

export default memo(CommentSection);