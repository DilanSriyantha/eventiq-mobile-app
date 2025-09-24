import { Page } from "@/common/types";
import { memo, useCallback, useEffect, useReducer } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ListEmptyComponent from "../ListEmptyIndicator";
import { addToList, setPage } from "./actions";
import reducer, { initialState } from "./reducer";
import { LazyLoadingListProps } from "./types";

function LazyLoadingList({ renderItem, keyExtractor, onLoad }: LazyLoadingListProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log(`loading=${state.loading}`);
    }, [state.loading]);

    useEffect(() => {
        if (state.loading) return;

        if (state.page < 0) {
            dispatch(setPage(state.page + 1));
            return;
        }

        loadMore();
    }, [state.page]);

    useEffect(() => {
        console.log(`page=${state.page}`, `totalPages=${state.totalPages}`);
    }, [state.list]);

    const loadMore = useCallback(async () => {
        setTimeout(() => onLoad(state.page, handleUpdateList), 1000);
    }, [state.page]);

    const handleUpdateList = useCallback((page: Page<any>) => {
        dispatch(addToList(page));
    }, []);

    const handleEndReached = useCallback(() => {
        if (state.loading) return;

        if ((state.page + 1) >= state.totalPages) return;

        dispatch(setPage(state.page + 1));
    }, [state.page, state.totalPages, state.loading]);

    return (
        <View style={styles.container}>
            <FlatList
                data={state.list}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={
                    state.totalPages >= 0 ? (
                        <ListEmptyComponent />
                    ) : null
                }
                ListFooterComponent={
                    ((state.page + 1) < state.totalPages || state.totalPages < 0) ? (
                        <View>
                            <ActivityIndicator size={"small"} animating />
                        </View>
                    ) : null
                }
                onEndReached={handleEndReached}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
    loading: {
        padding: 10,
        alignItems: "center",
    }
});

export default memo(LazyLoadingList);