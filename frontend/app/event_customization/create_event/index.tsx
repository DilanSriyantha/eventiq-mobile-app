import { useCallback, useReducer, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import EventDetailsInputForm from "./EventDetailsInputForm";
import { useEvents } from "@/context/EventsProvider";
import { EventDetailsFormResult } from "./EventDetailsInputForm/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { CreateEventRequest } from "@/context/EventsProvider/types";

export default function CreateEvent() {
    const [loading, setLoading] = useState<boolean>(false);

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

            setTimeout(() => {
                setLoading(false);
            }, 1000);

        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");

            setTimeout(() => {
                setLoading(false);
            }, 1000);

        }
    }, []);

    return (
        <View style={styles.container}>
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