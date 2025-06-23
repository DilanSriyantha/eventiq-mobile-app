import SearchBox from "@/components/SearchBox";
import { StyleSheet, View } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <SearchBox onTextChange={() => {}} />
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
});