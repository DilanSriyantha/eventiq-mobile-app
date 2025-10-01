import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function ManagePosts() {

    return (
        <View style={styles.container}>
            <Text variant="displaySmall">Manage Posts</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});