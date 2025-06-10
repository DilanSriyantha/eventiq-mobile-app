import WelcomeAnimation from "@/components/WelcomeAnimation";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Surface } from "react-native-paper";

export default function Index() {
    const routes = useRouter();

    function handleGetStartedPress() {
        routes.push("/auth" as any);
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <Surface style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {/* <Text variant="titleLarge">Welcome to EventiQ</Text> */}
                <WelcomeAnimation onGetStartedPress={handleGetStartedPress} />
            </Surface>
        </View>
    );
}