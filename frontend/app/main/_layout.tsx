import { router, usePathname } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, BottomNavigation } from "react-native-paper";
import About from "./about";
import Home from "./home";
import Profile from "./profile";
import Events from "./events";

const routes = [
    { key: 'home', title: 'Home', focusedIcon: 'home', route: '/main/home' },
    { key: 'events', title: 'My Events', focusedIcon: 'calendar-edit', route: '/main/events' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account', route: '/main/profile' },
    { key: 'about', title: 'About', focusedIcon: 'information', route: '/main/about' },
];

export default function MainLayout() {
    const pathname = usePathname();
    const [index, setIndex] = useState<number>(routes.findIndex(r => pathname.includes(r.key)));

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        profile: Profile,
        events: Events,
        about: About
    });

    const handleIndexChange = (newIndex: number) => {
        setIndex(newIndex);
        router.replace(routes[newIndex].route as any);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title={routes[index]?.title || "App"} />
                <Appbar.Action icon={"bell"} onPress={() => {}} />
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
});