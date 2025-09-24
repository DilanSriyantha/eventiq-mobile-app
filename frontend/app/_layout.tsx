import ApiProvider from "@/context/ApiProvider";
import AuthProvider from "@/context/AuthProvider";
import CommentsProvider from "@/context/CommentsProvider";
import { EventsProvider } from "@/context/EventsProvider";
import PostsProvider from "@/context/PostsProvider";
import ProviderServicesProvider from "@/context/ProviderServicesProvider";
import ServiceProvidersProvider from "@/context/ServiceProvidersProvider";
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
                                <ServiceProvidersProvider>
                                    <ProviderServicesProvider>
                                        <CommentsProvider>
                                            <EventsProvider>
                                                <SnackbarProvider>
                                                    <Slot />
                                                </SnackbarProvider>
                                            </EventsProvider>
                                        </CommentsProvider>
                                    </ProviderServicesProvider>
                                </ServiceProvidersProvider>
                            </PostsProvider>
                        </AuthProvider>
                    </ApiProvider>
                </UserProvider>
            </ThemeWrapper>
        </ThemeProvider>
    );
}