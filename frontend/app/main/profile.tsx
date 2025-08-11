import { useAuth } from "@/context/AuthProvider";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, List, Text } from "react-native-paper";

export default function Profile() {
    const auth = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.userNameContainer}>
                <Text variant="displayMedium">Dilan Sriyantha</Text>
                <Avatar.Text size={92} label={auth.currentUser ? auth.currentUser.name.substring(0, 1) : ""} />
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
    menu: {
        flex: 1,
        paddingTop: 20,
    }
});