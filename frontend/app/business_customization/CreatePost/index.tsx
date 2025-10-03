import AppBarView from "@/components/AppBarView";
import { StyleSheet } from "react-native";
import PostDetailsInputForm from "./PostDetailsInputForm";
import { PostDetailsInputFormResult } from "./PostDetailsInputForm/types";
import { onComplete, onError } from "../ManageBusinessInfo/BusinessDetailsInputForm/types";
import { usePosts } from "@/context/PostsProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { PostCreateRequest } from "@/context/PostsProvider/types";
import FirebaseStorageHelper from "@/app/utils/FirebaseStorage";
import { useRouter } from "expo-router";

export default function CreatePost() {
    const router = useRouter();

    const [user] = useCurrentUser();

    const posts = usePosts();

    const handleSubmit = (async (result: PostDetailsInputFormResult, notifyCompletion: onComplete, notifyError: onError) => {
        if (!user) return;

        try {
            const storage = new FirebaseStorageHelper();
            const downloadUrl = await storage.uploadFile(result.imageUrl);

            const req: PostCreateRequest = {
                ...result,
                imageUrl: downloadUrl,
                providerEmail: user.email,
            };

            const res = await posts.create(req);

            console.log(res);

            notifyCompletion();

            router.back();
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