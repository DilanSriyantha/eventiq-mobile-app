import { useCurrentUser } from "@/context/UserProvider";
import { router, usePathname } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Badge, BottomNavigation } from "react-native-paper";
import { Role } from "../enums/Role";
import Events from "./events";
import Home from "./home";
import ManageBusiness from "./manage_business";
import Profile from "./profile";
import { useNotifications } from "@/context/WebSocketProvider";

export default function MainLayout() {
    const [user] = useCurrentUser();
    const routes = useMemo(() => user && Role.of(user.role) === Role.PROVIDER ? [
        { key: 'home', title: 'Home', focusedIcon: 'home', route: '/main/home' },
        { key: 'events', title: 'My Events', focusedIcon: 'calendar-edit', route: '/main/events' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', route: '/main/profile' },
        { key: 'manage_business', title: 'My Business', focusedIcon: 'store-cog', route: '/main/manage_business' }
    ] : [
        { key: 'home', title: 'Home', focusedIcon: 'home', route: '/main/home' },
        { key: 'events', title: 'My Events', focusedIcon: 'calendar-edit', route: '/main/events' },
        { key: 'profile', title: 'Profile', focusedIcon: 'account', route: '/main/profile' },
    ], [user]);

    const pathname = usePathname();
    const [index, setIndex] = useState<number>(routes.findIndex(r => pathname.includes(r.key)));

    const notifications = useNotifications();

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        profile: Profile,
        events: Events,
        manage_business: ManageBusiness
    });

    const handleIndexChange = (newIndex: number) => {
        setIndex(newIndex);
        router.replace(routes[newIndex].route as any);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title={routes[index]?.title || "App"} />
                <Appbar.Action icon={"bell"} onPress={() => router.push("/notifications" as any)} />
                {notifications.getUnreadCount() > 0 && (
                    <Badge
                        visible
                        size={24}
                        style={styles.badge}
                    >
                        {notifications.getUnreadCount()}
                    </Badge>
                )}
            </Appbar.Header>

            {/* <Stack screenOptions={{ headerShown: false }} /> */}

            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={handleIndexChange}
                renderScene={renderScene}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    badge: {
        position: "absolute",
        top: 4,
        right: 4,
        backgroundColor: "red"
    },
});