import { Slot, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Appbar, PaperProvider } from "react-native-paper";

export default function CreateEventLayout() {
    const router = useRouter();
    
    return(
        <PaperProvider>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Create Event" />
            </Appbar.Header>

            <View style={styles.container}>
                <Slot />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});