import { useAuth } from "@/context/AuthProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { Link } from "expo-router";
import { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text, useTheme } from "react-native-paper";
import TitleContent from "../register/TitleContent";
import PlainLoginForm from "./PlainLoginForm";
import { PlainLoginFormHandle } from "./PlainLoginForm/types";

function Login() {
    const [loading, setLoading] = useState<boolean>(false);

    const theme = useTheme();

    const loginFormRef = useRef<PlainLoginFormHandle>(null);

    const auth = useAuth();
    const snackbar = useSnackbar();

    const handleSignIn = useCallback(() => {
        login();
    }, []);

    const login = useCallback(async () => {
        setLoading(true);

        try {
            if (!loginFormRef.current)
                throw new Error("Something went wrong!");

            const form = loginFormRef.current.submit();

            if (!form)
                throw new Error("Invalid inputs");

            await auth.login(form.email, form.password);
        } catch (err) {
            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred.");
            setLoading(false);
        }
    }, []);

    return (
        <View style={styles.container}>
            <Surface mode="flat" style={styles.contentContainer}>
                <View>
                    <TitleContent />
                </View>

                <View>
                    <PlainLoginForm ref={loginFormRef} />
                </View>

                <View style={styles.message}>
                    <Text variant="bodyLarge" style={{ textAlign: "center" }}>Haven't an account? <Link href={"/auth/register"} style={{ color: theme.colors.primary }}>Sign up</Link></Text>
                </View>

                <View>
                    <Button mode="contained" style={styles.button} onPress={handleSignIn} loading={loading}>Sign in</Button>
                </View>
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
    },
    button: {
        borderRadius: 5,
        padding: 5
    },
    message: {
        flex: 1,
        gap: 10,
        paddingTop: 15,
        textAlign: "center",
        justifyContent: "flex-start",
        alignItems: "center"
    }
});

export default memo(Login);