import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

export default function Index() {

    const auth = useAuth();
    const theme = useTheme();
    const router = useRouter();

    useEffect(() => {
        if(!auth.isLoaded) return;

        if(!auth.currentUser) {
            setTimeout(() => router.replace("/auth"), 1000);
            return;
        }

        setTimeout(() => router.replace("/main/home"), 1000);
    }, [auth.isLoaded && auth.currentUser]);

    return (
        <View style={{
            flex: 1,
        }}>
            <Surface style={styles.container}>
                <View style={{...styles.appIcon, backgroundColor: theme.colors.onSecondary}} >
                    <View style={styles.appnameContainer}>
                        <Text style={{...styles.appname, color: theme.colors.primary}} variant="headlineSmall">EventiQ</Text>
                    </View>
                </View>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    appIcon: {
        position: "relative",
        padding: 50,
        borderRadius: 20,
        width: 50,
        height: 50,
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    appnameContainer: {
        position: "absolute"
    },
    appname: {

    }
});