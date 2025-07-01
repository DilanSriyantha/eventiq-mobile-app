import { memo, ReactNode, useCallback, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

interface LazyLoadingListProps <T> {
    data: T[],
    renderItem: (item: T, index: number) => ReactNode;
    onLoadMore?: () => void;
};

const LazyLoadingList = <T, >(props: LazyLoadingListProps<T>) => {
    const theme = useTheme();

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>): void => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isBottomReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if(isBottomReached)
            console.log("bottom reached");
    }, []);

    return (
        <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ backgroundColor: theme.colors.background }}
        >
            <View style={styles.content}>
                {props.data.map((item, idx) => props.renderItem(item, idx))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 5,
    }
});

export default memo(LazyLoadingList);