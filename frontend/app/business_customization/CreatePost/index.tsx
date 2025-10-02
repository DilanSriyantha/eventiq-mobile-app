import AppBarView from "@/components/AppBarView";
import { StyleSheet } from "react-native";
import PostDetailsInputForm from "./PostDetailsInputForm";
import { PostDetailsInputFormResult } from "./PostDetailsInputForm/types";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import { usePosts } from "@/context/PostsProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { PostCreateRequest } from "@/context/PostsProvider/types";
import { useSnackbar } from "@/context/SnackbarProvider";

export default function CreatePost() {
    const [user] = useCurrentUser();

    const posts = usePosts();
    const snackbar = useSnackbar();

    const handleSubmit = (async (result: PostDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!user) return;

        try {
            const req: PostCreateRequest = {
                ...result,
                imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
                providerEmail: user.email,
            };

            console.log(req);

            const res = await posts.create(req);

            console.log(res);

            notifyCompletion();
        } catch (err) {
            console.log(err);

            notifyError(err instanceof Error ? err : new Error("An unknown error occurred while creating a new post."));

            throw err;
        }
    });

    return (
        <AppBarView title="Create Post">
            <PostDetailsInputForm
                onSubmit={handleSubmit}
            />
        </AppBarView>
    );
}

const styles = StyleSheet.create({

});