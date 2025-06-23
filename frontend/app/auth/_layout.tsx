import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

export default function AuthLayout() {
    return (
        <PaperProvider>
            <StatusBar
                translucent
                backgroundColor={"transparent"}
                style="auto"
            />
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
