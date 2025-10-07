import { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Surface } from "react-native-paper";
import { useEvents } from "@/context/EventsProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { ConsumerEvent, UpdateEventRequest } from "@/context/EventsProvider/types";
import { EventDetailsFormResult } from "../CreateEvent/EventDetailsInputForm/types";
import EventDetailsInputForm from "../CreateEvent/EventDetailsInputForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import Utils from "@/app/utils/Utils";

function EditEvent() {
    const { eventId } = useLocalSearchParams();

    const router = useRouter();

    const [event, setEvent] = useState<ConsumerEvent | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [user] = useCurrentUser();

    const events = useEvents();
    const snackbar = useSnackbar();

    useEffect(() => {
        fetchEvent();
    }, []);

    const fetchEvent = useCallback(async () => {
        if (!eventId) return;

        setLoading(true);

        try {
            const res = await events.get(parseInt(eventId as string));

            setEvent(res);

            await Utils.waitFor(1000);
            setLoading(false);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");

            await Utils.waitFor(500);
            setLoading(false);
        }
    }, []);

    const handleSubmit = useCallback(async (result: EventDetailsFormResult | null) => {
        if (!event) return;

        if (!result) {
            snackbar.showError("Something went wrong!");
            return;
        }

        if (!user) {
            snackbar.showError("Something went wrong!");
            return;
        }

        setLoading(true);

        const req: UpdateEventRequest = {
            id: event.id,
            userEmail: user.email,
            title: result.title,
            description: result.description,
            date: result.date
        };

        try {
            await events.update(req);

            snackbar.showSuccess("Event updated successfully.");

            await Utils.waitFor(1000);
            router.back();
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");

            await Utils.waitFor(500);
            setLoading(false);
        }
    }, [event]);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={"Edit Event"} />
            </Appbar.Header>

            <Surface
                mode="flat"
                style={styles.contentContainer}
            >
                {loading && !event ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={"large"} animating />
                    </View>
                ) : null}

                {event && (
                    <EventDetailsInputForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        initialTitle={event.title}
                        intialDate={event.date}
                        initialDescription={event.description}
                    />
                )}
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        gap: 1,
        padding: 10,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        padding: 10,
        marginBottom: 60
    },
    formContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default memo(EditEvent);