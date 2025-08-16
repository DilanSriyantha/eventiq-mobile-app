import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LazyLoadingListHandle, LazyLoadingListProps } from "./types";

const LazyLoadingList = forwardRef<LazyLoadingListHandle, LazyLoadingListProps>(({ onItemClick }, ref) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        loadMore: () => loadMore(),
    }));

    useEffect(() => {

    }, []);

    const loadMore = useCallback(() => {
        
    }, []);

    return (
        <View style={styles.container}>
            {}
        </View>
    );
});

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