import PostsList from "@/app/main/home/PostsList";
import AppBarView from "@/components/AppBarView";
import { Post } from "@/context/PostsProvider/types";
import { useCurrentUser } from "@/context/UserProvider";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export default function ManagePosts() {
    const [user] = useCurrentUser();

    const router = useRouter();

    const handleNewPostClick = useCallback(() => {
        router.push("/business_customization/CreatePost");
    }, []);

    const handlePostEditClick = useCallback((post: Post) => {
        router.push(`/business_customization/EditPost?postId=${post.id}` as any);
    }, []);

    return (
        <AppBarView title="Manage Posts">
            <FAB
                icon={"plus"}
                label={"New Post"}
                style={styles.fab}
                onPress={handleNewPostClick}
            />

            <PostsList
                searchKey=""
                providerEmail={user?.email}
                onItemEditPressed={handlePostEditClick}
            />
        </AppBarView>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 20,
        zIndex: 1
    },
});