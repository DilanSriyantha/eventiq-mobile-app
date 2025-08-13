import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar, PaperProvider, useTheme } from "react-native-paper";

export default function EventCustomizationLayout() {
    const { title } = useLocalSearchParams();

    const theme = useTheme();
    const router = useRouter();
    
    return(
        <PaperProvider>
            {
                title && !title.toString().includes("Event Overview") &&
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => router.back()} />
                    <Appbar.Content title={title} />
                </Appbar.Header>
            }

            <View style={{...styles.container, backgroundColor: theme.colors.background}}>
                <Stack screenOptions={{ headerShown: false }} />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});