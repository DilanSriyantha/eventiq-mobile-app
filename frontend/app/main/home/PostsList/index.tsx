import { usePosts } from "@/context/PostsProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { memo, useCallback, useEffect, useReducer, useRef } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PostComp from "../PostComp";
import { setPage, setPosts, setSearchKey } from "./PostsListActions";
import { initialState, reducer } from "./PostsListReducer";
import { PostsListProps } from "./types";
import { Post } from "@/context/PostsProvider/types";
import { Page } from "@/common/types";

function PostsList({ searchKey, providerEmail, onItemCheckPressed, onItemEditPressed, onItemRatePressed }: PostsListProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const isMounted = useRef<boolean>(false);

    const posts = usePosts();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchPosts();
    }, [state.searchKey, state.page]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        dispatch(setSearchKey(searchKey));
    }, [searchKey]);

    const fetchPosts = useCallback(async () => {
        try {
            let res: Page<Post>;

            if (providerEmail) {
                res = await posts.getPageByProviderEmail(10, state.page, providerEmail);
                setTimeout(() => dispatch(setPosts(res)), 1000);

                return;
            }

            if (state.searchKey.length > 0)
                res = await posts.search(state.searchKey, 10, state.page);
            else
                res = await posts.getPage(10, state.page);

            setTimeout(() => dispatch(setPosts(res)), 1000);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, [state.searchKey, state.page]);

    const handleEndReached = useCallback(() => {
        dispatch(setPage(state.page + 1));
    }, [state.page]);

    return (
        <FlatList
            data={state.posts}
            renderItem={({ item }) => <PostComp post={item} editable={providerEmail ? true : false} onEditPress={onItemEditPressed} onCheckPressed={onItemCheckPressed} onRatePressed={onItemRatePressed} />}
            keyExtractor={(item, idx) => `${item.id}-${idx}-${item.title}`}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={state.loading ? (
                <View style={{ padding: 10 }}>
                    <ActivityIndicator />
                </View>
            ) : null}
            onEndReached={handleEndReached}
        />
    );
}

export default memo(PostsList);