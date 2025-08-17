import { useAuth } from "@/context/AuthProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";
import Role from "../../enums/Role";
import AnimatedRegistrationForm from "./AnimatedRegistrationForm";
import { LoginFormResult, RegisterFormResult } from "./AnimatedRegistrationForm/types";

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);

    const auth = useAuth();
    const snackbar = useSnackbar();

    const onFinished = useCallback((result: RegisterFormResult | LoginFormResult) => {
        register(result as RegisterFormResult);
    }, []);

    const register = useCallback(async (form: RegisterFormResult) => {
        setLoading(true);

        try {
            await auth.register( form.name, form.email, form.password, Role.ADMIN);
        } catch (err) {
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred.");

            setLoading(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Surface mode="flat" style={styles.contentContainer}>
                <AnimatedRegistrationForm
                    onFinished={onFinished}
                    loading={loading}
                    mode={"register"}
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