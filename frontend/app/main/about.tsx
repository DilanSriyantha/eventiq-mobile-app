import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function About() {
    return (
        <View style={styles.container}>
            <Text>About</Text>
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});