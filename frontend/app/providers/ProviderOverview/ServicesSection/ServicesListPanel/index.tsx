import { ProviderService } from "@/context/ProviderServicesProvider/types";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { addToList, startLoading, stopLoading } from "./actions";
import reducer, { initialState } from "./reducer";
import ServiceOption from "./ServiceOption";
import { ServicesListPanelHandle, ServicesListPanelProps } from "./types";

const ServicesListPanel = forwardRef<ServicesListPanelHandle, ServicesListPanelProps>((props, ref) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useImperativeHandle(ref, () => ({
        loadMore: () => loadMore(),
    }));

    useEffect(() => {
        console.log(JSON.stringify(state.servicesList, null, "\t"));
    }, [state.servicesList]);

    useEffect(() => {
        loadMore();
    }, [state.page]);

    const loadMore = useCallback(() => {
        if (state.loading) return;

        dispatch(startLoading());

        props.onLoad.apply(null, [state.page, state.pageSize, (result) => dispatch(addToList(result))]);

        setTimeout(() => {
            dispatch(stopLoading());
        }, 1000);
    }, [state.loading, state.page, state.pageSize]);

    const handleItemClick = useCallback((item: ProviderService) => {
        props.onItemClick?.apply(null, [item]);
    }, []);

    return (
        <View style={styles.container}>
            {state.servicesList.map((ps, idx) => (
                <ServiceOption
                    key={idx}
                    {...ps}
                    onClick={() => handleItemClick(ps)}
                />
            ))}

            {state.loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size={"small"} />
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
    loading: {
        padding: 20,
        alignItems: "center"
    }
});

export default memo(ServicesListPanel);