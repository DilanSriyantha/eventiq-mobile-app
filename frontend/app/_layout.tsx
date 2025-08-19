import ApiProvider from "@/context/ApiProvider";
import AuthProvider from "@/context/AuthProvider";
import PostsProvider from "@/context/PostsProvider";
import SnackbarProvider from "@/context/SnackbarProvider";
import UserProvider from "@/context/UserProvider";
import { Slot } from "expo-router";
import { ThemeProvider } from "./themes/ThemeProvider";
import ThemeWrapper from "./themes/ThemeWrapper";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <ThemeWrapper>
                <UserProvider>
                    <ApiProvider>
                        <AuthProvider>
                            <PostsProvider>
                                <SnackbarProvider>
                                    <Slot />
                                </SnackbarProvider>
                            </PostsProvider>
                        </AuthProvider>
                    </ApiProvider>
                </UserProvider>
            </ThemeWrapper>
        </ThemeProvider>
    );
}