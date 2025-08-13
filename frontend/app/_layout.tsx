import ApiProvider from "@/context/ApiProvider";
import AuthProvider from "@/context/AuthProvider";
import SnackbarProvider from "@/context/SnackbarProvider";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
    return (
        <ApiProvider>
            <AuthProvider>
                <SnackbarProvider>
                    <PaperProvider>
                        <Slot />
                    </PaperProvider>
                </SnackbarProvider>
            </AuthProvider>
        </ApiProvider>
    );
}