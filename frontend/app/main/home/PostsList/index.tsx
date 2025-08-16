import { usePosts } from "@/context/PostsProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { memo, useCallback, useEffect, useReducer } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import PostComp from "../PostComp";
import { setPage, setPosts } from "./PostsListActions";
import { initialState, reducer } from "./PostsListReducer";
import { PostsListProps } from "./types";

function PostsList({ searchKey }: PostsListProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const posts = usePosts();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchPosts();
    }, [state.page]);

    const fetchPosts = useCallback(async () => {
        try{
            const res = await posts.getPage(10, state.page);

            setTimeout(() => dispatch(setPosts(res)), 1000);
        }catch(err){
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    function handleCheckPress() {
        
    }

    function handleRatePress() {

    }

    const handleEndReached = useCallback(() => {
        dispatch(setPage(state.page++));
    }, []);

    const FooterComponent = useCallback(() => {
        if(state.loading)
            return (
                <View style={{ padding: 10 }}>
                    <ActivityIndicator />
                </View>
            );
        
        return null;
    }, [state.loading]);

    return (
        <FlatList
            data={state.posts}
            renderItem={({ item }) => <PostComp {...item} onCheckPress={handleCheckPress} onRatePress={handleRatePress} />}
            keyExtractor={(item, idx) => `${item.id}-${idx}-${item.title}`}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={FooterComponent}
            onEndReached={handleEndReached}
        />
    );
}

export default memo(PostsList);