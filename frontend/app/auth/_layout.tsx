import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function AuthLayout() {
    return (
        <>
            <StatusBar
                translucent
                backgroundColor={"transparent"}
                style="auto"
            />
            <View style={styles.container}>
                <Slot />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
}); 
