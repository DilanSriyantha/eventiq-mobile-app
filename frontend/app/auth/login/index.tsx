import { useAuth } from "@/context/AuthProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { memo, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Surface } from "react-native-paper";
import TitleContent from "../register/TitleContent";
import PlainLoginForm from "./PlainLoginForm";
import { LoginFormResult } from "./PlainLoginForm/types";

function Login() {
    const [loading, setLoading] = useState<boolean>(false);

    const auth = useAuth();
    const snackbar = useSnackbar();

    const handleSignIn = useCallback((form: LoginFormResult | null) => {
        login(form);
    }, []);

    const login = useCallback(async (form: LoginFormResult | null) => {
        setLoading(true);

        try {
            if (!form)
                throw new Error("Invalid inputs");

            await auth.login(form.email, form.password);
        } catch (err) {
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred.");

            setLoading(false);
        }
    }, []);

    return (
        <Surface mode="flat" style={styles.container}>
            <TitleContent style={styles.titleContent} />
            <PlainLoginForm style={styles.form} onSubmit={handleSignIn} loading={loading} />
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

export default memo(Login);