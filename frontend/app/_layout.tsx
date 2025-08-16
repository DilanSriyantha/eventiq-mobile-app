import ApiProvider from "@/context/ApiProvider";
import AuthProvider from "@/context/AuthProvider";
import PostsProvider from "@/context/PostsProvider";
import SnackbarProvider from "@/context/SnackbarProvider";
import UserProvider from "@/context/UserProvider";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
    return (
        <UserProvider>
            <ApiProvider>
                <AuthProvider>
                    <PostsProvider>
                        <SnackbarProvider>
                            <PaperProvider>
                                <Slot />
                            </PaperProvider>
                        </SnackbarProvider>
                    </PostsProvider>
                </AuthProvider>
            </ApiProvider>
        </UserProvider>
    );
}