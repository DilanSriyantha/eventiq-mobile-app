import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function AuthLayout() {
    return (
        <PaperProvider>
            <Slot />
        </PaperProvider>
    );
}
