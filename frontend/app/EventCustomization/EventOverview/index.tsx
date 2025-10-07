import { ManagableEvent } from "@/common/types";
import ParallaxViewWrapper from "@/components/ParallaxViewWrapper";
import { ConsumerEvent } from "@/context/EventsProvider/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import moment from "moment";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Surface, Text } from "react-native-paper";
import reducer, { initialState } from "./reducer";
import { useEvents } from "@/context/EventsProvider";
import { setEvent, stopLoading } from "./actions";
import Utils from "@/app/utils/Utils";
import DescriptionComp from "./DescriptionComp";
import ServicesComp from "./ServicesComp";
import ActionsComp from "./ActionsComp";

const calculateDaysLeft = (event: ConsumerEvent | null): string => {
    if (!event) return "0 days left";

    const today = new Date(Date.now());
    const eventDate = new Date(event.date);

    if (moment(today).isAfter(eventDate)) return `Passed (${event.date})`;

    if (moment(today).isSame(eventDate)) return `Today`;

    const daysLeft = moment(eventDate).diff(moment(today), "days", false);

    return `${daysLeft} days left`;
};

export default function EventOverview() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const router = useRouter();
    const events = useEvents();
    const snackbar = useSnackbar();

    const daysLeft = useMemo(() => calculateDaysLeft(state.event), [state.event]);

    const { id }: any = useLocalSearchParams();

    useEffect(() => {
        fetchEvent(id);
    }, []);

    const fetchEvent = async (eventId: number) => {
        try {
            const res = await events.get(eventId);

            await Utils.waitFor(500);
            dispatch(setEvent(res));
        } catch (err) {
            console.log(err);

            await Utils.waitFor(1000);
            dispatch(stopLoading());

            await Utils.waitFor(500);
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    };

    const handleAddPress = useCallback(() => {
        router.replace("/main/home");
    }, []);

    return (
        <>
            {state.loading ? (
                <View style={styles.container}>
                    <Surface style={styles.contentContainer}>
                        <ActivityIndicator animating size={"large"} />
                    </Surface>
                </View>
            ) : state.event && (
                <ParallaxViewWrapper
                    image={require("../../../assets/images/event_overview_header_back.jpg")}
                    title={state.event ? state.event.title : "Invalid"}
                    subTitle={daysLeft}
                    onBackPress={router.back}
                >
                    <>
                        <DescriptionComp description={state.event.description} />
                        <ServicesComp eventId={state.event.id} />
                        <ActionsComp eventId={state.event.id} />
                    </>
                </ParallaxViewWrapper>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    contentBlock: {
        padding: 10,
        borderRadius: 5,
    }
});