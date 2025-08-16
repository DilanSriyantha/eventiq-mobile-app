import { useAuth } from "@/context/AuthProvider";
import { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, List, Text } from "react-native-paper";

export default function Profile() {
    const auth = useAuth();

    const handleLogout = useCallback(() => {
        auth.logout();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.userNameContainer}>
                <View style={styles.nameContainer}>
                    <Text variant="displayMedium">{auth.currentUser ? auth.currentUser.name : "User"}</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Avatar.Text size={92} label={auth.currentUser ? auth.currentUser.name.substring(0, 1) : "U"} />
                </View>
            </View>
            <ScrollView style={styles.menu}>
                <List.Item
                    title="Help"
                    left={props => <List.Icon {...props} icon="lifebuoy" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="Privacy"
                    left={props => <List.Icon {...props} icon="eye-remove-outline" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="Accessibility"
                    left={props => <List.Icon {...props} icon="human" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="About"
                    left={props => <List.Icon {...props} icon="information-outline" />}
                    onPress={() => { }}
                />
                <List.Item
                    title="Log out"
                    left={props => <List.Icon {...props} icon="logout" />}
                    onPress={handleLogout}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 1
    },
    userNameContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nameContainer: {
        flex: 1,
        // maxWidth: "70%",
        flexWrap: "nowrap",
        paddingRight: 10,
    },
    avatarContainer: {
        flex: 1,
    },
    menu: {
        flex: 1,
        paddingTop: 20,
    }
});