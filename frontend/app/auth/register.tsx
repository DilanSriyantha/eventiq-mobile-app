import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Register() {
    return (
        <View style={styles.container}>
            <Text>Register</Text>
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