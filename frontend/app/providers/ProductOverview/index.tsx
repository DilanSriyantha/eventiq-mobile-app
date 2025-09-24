import FABGroup from "@/components/FABGroup";
import ParallaxViewWrapper from "@/components/ParallaxViewWrapper";
import { useProviderServices } from "@/context/ProviderServicesProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useReducer } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import RatingSection from "../ProviderOverview/RatingSection";
import { setProduct, startLoading } from "./actions";
import CommentSectionWrapper from "./CommentSectionWrapper";
import DescriptionSection from "./DescriptionSection";
import reducer, { initialState } from "./reducer";

export default function ProductOverview() {
    const { psId } = useLocalSearchParams();

    const [state, dispatch] = useReducer(reducer, initialState);

    const router = useRouter();
    const providerServices = useProviderServices();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = useCallback(async () => {
        if (!psId) return;

        dispatch(startLoading());

        try {
            const product = await providerServices.getOne(psId as any);

            setTimeout(() => dispatch(setProduct(product)), 1000);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }, []);

    const handleAddPress = useCallback(() => {
        router.replace(`/main/events?serviceId=${psId}`);
    }, []);

    return (
        <>
            {
                state.loading ? (
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator
                            animating
                            size={"large"}
                        />
                    </View>
                ) : (
                    state.product && (
                        <>
                            <ParallaxViewWrapper
                                image={{ uri: state.product.imageUrl }}
                                title={state.product.title}
                                subTitle={""}
                                onBackPress={router.back}
                            >
                                {
                                    state.product && (
                                        <View style={styles.content}>
                                            <DescriptionSection description={state.product.description} />
                                            <RatingSection value={state.product.rate} />
                                            <CommentSectionWrapper serviceId={psId as any} />
                                        </View>
                                    )
                                }
                            </ParallaxViewWrapper>
                            <FABGroup
                                icon={"plus"}
                                actions={[
                                    {
                                        icon: "star",
                                        label: "Rate",
                                        onPress: () => { }
                                    },
                                    {
                                        icon: "plus",
                                        label: "Add to an event",
                                        onPress: () => {
                                            handleAddPress();
                                        }
                                    }
                                ]}
                            />
                        </>
                    )
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 10,
        gap: 25,
    },
    section: {

    },
    sectionContentContainer: {
        gap: 10,
    },
    sectionTitle: {
        fontWeight: "bold",
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});