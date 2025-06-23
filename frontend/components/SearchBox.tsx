import { SearchBoxProps } from "@/types/types";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

export default function SearchBox(props: SearchBoxProps) {

    return (
        <View style={styles.container}>
            <TextInput
                left={<TextInput.Icon icon={"magnify"}/>}
                mode="flat"
                style={styles.textInput}
            />  
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: "auto",
        width: "100%",
    },
    textInput: {
        borderBottomWidth: 0
    }
});