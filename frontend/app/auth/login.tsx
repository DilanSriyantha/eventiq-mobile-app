import AnimatedRegistrationForm, { LoginFormResult, RegisterFormResult } from "@/components/AnimatedRegistrationForm";
import { useAuth } from "@/context/AuthProvider";
import { useSnackbar } from "@/context/SnackbarProvider";
import { memo, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

function Login() {
    const [loading, setLoading] = useState<boolean>(false);

    const auth = useAuth();
    const snackbar = useSnackbar();

    const onFinished = useCallback((result: RegisterFormResult | LoginFormResult) => {
        login(result as LoginFormResult);
    }, []);

    const login = useCallback(async(form: LoginFormResult) => {
        setLoading(true);

        try{
            await auth.login(form.email, form.password);
        }catch(err){
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
                    mode={"login"}
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

export default memo(Login);