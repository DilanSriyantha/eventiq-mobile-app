import WelcomeAnimation from "@/components/WelcomeAnimation";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Surface, Text } from "react-native-paper";

export default function Index() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const routes = useRouter();
    const auth = useAuth();

    useEffect(() => {
        if (auth.isUserAvailable()) {
            routes.replace("/main/home");

            return;
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, [auth.currentUser]);

    function handleGetStartedPress() {
        routes.push("/auth" as any);
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <Surface style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {
                    isLoading ? (
                        <Text variant="bodyMedium">Initializing...</Text>
                    ) : (
                        <WelcomeAnimation onGetStartedPress={handleGetStartedPress} />
                    )
                }
            </Surface>
        </View>
    );
}