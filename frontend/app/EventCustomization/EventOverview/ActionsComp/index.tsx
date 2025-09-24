import { Button, useTheme } from "react-native-paper";
import ContentBlock from "../../CreateEvent/ContentBlock";
import { ActionsCompProps } from "./types";
import { memo, useCallback, useState } from "react";
import { useEvents } from "@/context/EventsProvider";
import Utils from "@/app/utils/Utils";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

function ActionComp({ eventId }: ActionsCompProps) {
    const [deleting, setDeleting] = useState<boolean>(false);

    const router = useRouter();
    const theme = useTheme();
    const snackbar = useSnackbar();
    const events = useEvents();

    const handleDelete = useCallback(() => {
        deleteEvent();
    }, []);

    const handleEdit = useCallback(() => {
        router.push(`/EventCustomization/EditEvent?title=Edit Event&eventId=${eventId}`);
    }, []);

    const deleteEvent = useCallback(async () => {
        setDeleting(true);

        try {
            const res = await events.deleteOne(eventId);

            snackbar.showSuccess(res.message);

            await Utils.waitFor(500);
            router.back();
        } catch (err) {
            console.log(err);

            await Utils.waitFor(1000);
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");

            await Utils.waitFor(1000);
            setDeleting(false);
        }
    }, []);

    return (
        <ContentBlock>
            <Button
                mode="text"
                textColor={theme.colors.error}
                icon={"delete"}
                onPress={handleDelete}
                style={styles.button}
            >Delete</Button>

            <Button
                mode="text"
                textColor={theme.colors.primary}
                icon={"pencil"}
                onPress={handleEdit}
                style={styles.button}
            >Edit</Button>
        </ContentBlock>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
    }
});

export default memo(ActionComp);