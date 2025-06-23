import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";

export default function Login() {
    const routes = useRouter();

    function handleContinueWithGooglePress() {
        routes.push("/auth/register");
    }

    function handleContinueWithEmailPress() {
        routes.push("/auth/register");
    }

    return (
        <View style={styles.container}>
            <Surface mode="flat" style={styles.contentContainer}>
                <Surface mode="flat" style={styles.headerContainer}>
                    <Text variant="headlineMedium">Let's get started</Text>
                </Surface>
                <Surface mode="flat" style={styles.optionsContainer}>
                    <Button style={styles.withGoogleButton} icon={"google"} mode="contained-tonal" onPress={handleContinueWithGooglePress}>Continue with google</Button>
                    <Divider />
                    <Button style={styles.withGoogleButton} icon={"email"} mode="contained-tonal" onPress={handleContinueWithEmailPress}>Continue with Email</Button>
                </Surface>
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
        paddingTop: 60,
    },
    headerContainer: {
        flex: .1,
    },
    optionsContainer: {
        flex: 1,
        gap: 10,
    },
    withGoogleButton: {
        borderRadius: 5,
    },
});