import { usePosts } from "@/context/PostsProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { PostDetailsInputFormResult } from "../CreatePost/PostDetailsInputForm/types";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import AppBarView from "@/components/AppBarView";
import PostDetailsInputForm from "../CreatePost/PostDetailsInputForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { PostUpdateRequest } from "@/context/PostsProvider/types";

export default function EditPost() {
    const { postId } = useLocalSearchParams();

    const [user] = useCurrentUser();

    const router = useRouter();
    const posts = usePosts();
    const snackbar = useSnackbar();

    const fetchPost = useCallback(async (notifyCompletion: onComplete, notifyError: onError) => {
        if (!postId) return;

        try {
            const post = await posts.get(parseInt(postId.toString()));

            notifyCompletion(post);
        } catch (err) {
            console.log(err);

            notifyError(err instanceof Error ? err : new Error("An unknown error occurred"));

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    const handleSubmit = async (result: PostDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!postId) return;

        if (!user) return;

        try {
            const req: PostUpdateRequest = {
                ...result,
                postId: parseInt(postId.toString()),
                providerEmail: user.email,
            }

            const res = await posts.update(req);

            console.log(res);

            snackbar.showSuccess("Post updated successfully.");

            notifyCompletion();
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
            <PostDetailsInputForm
                onInitialize={fetchPost}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </AppBarView>
    );
}