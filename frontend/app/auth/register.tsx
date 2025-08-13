import AnimatedRegistrationForm, { FormResult } from "@/components/AnimatedRegistrationForm";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import Role from "../enums/Role";
import { useAuth } from "@/context/AuthProvider";
import { useSnackbar } from "@/context/SnackbarProvider";

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);

    const routes = useRouter();
    const auth = useAuth();
    const snackbar = useSnackbar();

    useEffect(() => {
        if (auth.currentUser === null) return;

        routes.replace("/main/home");
    }, [auth.currentUser]);

    const onFinished = useCallback((result: FormResult) => {
        register(result);
    }, []);

    const register = useCallback(async (result: FormResult) => {
        setLoading(true);

        try {
            const res = await auth.register(
                result.name,
                result.email,
                result.password,
                Role.ADMIN
            );

            if (res) {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        } catch (err) {
            console.error(err);

            setTimeout(() => {
                setLoading(false);
                snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred.");
            }, 500);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Surface mode="flat" style={styles.contentContainer}>
                <AnimatedRegistrationForm
                    onFinished={onFinished}
                    loading={loading}
                />
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 1
    },
    contentContainer: {
        flex: 1,
        gap: 1,
        padding: 10,
        paddingTop: 60
    }
});