import { useAuth } from "@/context/AuthProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import PlainRegistrationForm from "./PlainRegistrationForm";
import { RegisterFormResult } from "./PlainRegistrationForm/types";
import TitleContent from "./TitleContent";

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);

    const auth = useAuth();
    const snackbar = useSnackbar();

    const handleSignUp = useCallback((form: RegisterFormResult | null) => {
        register(form);
    }, []);

    const register = useCallback(async (form: RegisterFormResult | null) => {
        setLoading(true);

        try {
            if (!form)
                throw new Error("Invalid inputs!");

            await auth.register(form.name, form.email, form.password, form.role);
        } catch (err) {
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred.");

            setLoading(false);
        }
    }, []);

    return (
        <Surface mode="flat" style={styles.container}>
            <TitleContent style={styles.titleContent} />
            <PlainRegistrationForm style={styles.form} loading={loading} onSubmit={handleSignUp} />
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        gap: 1,
        padding: 10,
        paddingBottom: 20,
    },
    titleContent: {
        flex: 1,
    },
    form: {
        gap: 15,
    },
});