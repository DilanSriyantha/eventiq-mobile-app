import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Surface } from "react-native-paper";
import EventDetailsInputForm from "./EventDetailsInputForm";
import { useEvents } from "@/context/EventsProvider";
import { EventDetailsFormResult } from "./EventDetailsInputForm/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { CreateEventRequest } from "@/context/EventsProvider/types";
import { useRouter } from "expo-router";
import Utils from "@/app/utils/Utils";

export default function CreateEvent() {
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const [user] = useCurrentUser();

    const events = useEvents();
    const snackbar = useSnackbar();

    const handleSubmit = useCallback(async (result: EventDetailsFormResult | null) => {
        if (!result) {
            snackbar.showError("Something went wrong!");
            return;
        }

        if (!user) {
            snackbar.showError("Something went wrong!");
            return;
        }

        setLoading(true);

        const req: CreateEventRequest = {
            userEmail: user.email,
            title: result.title,
            description: result.description,
            date: result.date
        };
        try {
            await events.create(req);

            snackbar.showSuccess("Event created successfully.");

            await Utils.waitFor(1000);
            setLoading(false);

            await Utils.waitFor(100);
            router.back();
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");

            await Utils.waitFor(1000);
            setLoading(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={"Create Event"} />
            </Appbar.Header>

            <Surface
                mode="flat"
                style={styles.contentContainer}
            >
                <EventDetailsInputForm
                    onSubmit={handleSubmit}
                    loading={loading}
                />
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
});