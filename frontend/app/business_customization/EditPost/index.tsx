import { usePosts } from "@/context/PostsProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { PostDetailsInputFormResult } from "../CreatePost/PostDetailsInputForm/types";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import AppBarView from "@/components/AppBarView";
import PostDetailsInputForm from "../CreatePost/PostDetailsInputForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Post, PostUpdateRequest } from "@/context/PostsProvider/types";
import FirebaseStorageHelper from "@/app/utils/FirebaseStorage";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function EditPost() {
    const { postId } = useLocalSearchParams();

    const [user] = useCurrentUser();
    const [post, setPost] = useState<Post | null>(null);

    const router = useRouter();
    const posts = usePosts();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = useCallback(async () => {
        if (!postId) return;

        try {
            const post = await posts.get(parseInt(postId.toString()));

            setTimeout(() => {
                setPost(post);
            }, 1000);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    const handleSubmit = async (result: PostDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!postId) return;

        if (!user) return;

        if (!post) return;

        try {
            const hasImageChanged = result.imageUrl !== post.imageUrl;

            let downloadUrl = result.imageUrl;
            if (hasImageChanged) {
                const storage = new FirebaseStorageHelper();
                downloadUrl = await storage.uploadFile(result.imageUrl);
            }

            const req: PostUpdateRequest = {
                ...result,
                postId: parseInt(postId.toString()),
                providerEmail: user.email,
                imageUrl: downloadUrl
            }

            const res = await posts.update(req);

            console.log(res);

            snackbar.showSuccess("Post updated successfully.");

            notifyCompletion();

            router.back();
        } catch (err) {
            console.log(err);

            notifyError(err instanceof Error ? err : new Error("An unknown error occurred while creating a new post."));

            throw err;
        }
    };

    const handleDelete = useCallback(async (error: onError) => {
        if (!postId) return;

        try {
            const deleted = await posts.deleteOne(parseInt(postId.toString()));

            console.log(deleted);

            snackbar.showSuccess("Post deleted successfully");

            router.back();
        } catch (err) {
            error(err as any);
        }
    }, []);

    return (
        <AppBarView title="Edit Post">
            {
                post && user ? (
                    <PostDetailsInputForm
                        initialData={{ ...post, postId: post.id, providerEmail: user.email } as PostUpdateRequest}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            animating
                            size={"large"}
                        />
                    </View>
                )
            }
        </AppBarView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});