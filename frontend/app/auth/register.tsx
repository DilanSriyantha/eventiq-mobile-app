import AnimatedRegistrationForm from "@/components/AnimatedRegistrationForm";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface } from "react-native-paper";

export default function Register() {
    const routes = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function onEmailChanged(email: string) {
        console.log(email);
    }

    function onPasswordChanged(password: string) {
        console.log(password);
    }

    function onFinished() {
        routes.replace("/main/home" as any);
    }

    return (
        <View style={styles.container}>
            <Surface mode="flat" style={styles.contentContainer}>
               <AnimatedRegistrationForm onEmailChanged={onEmailChanged} onPasswordChanged={onPasswordChanged} onFinished={onFinished} />
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