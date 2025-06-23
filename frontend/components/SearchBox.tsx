import { SearchBoxProps } from "@/types/types";
import { StyleSheet, TextInput, View } from "react-native";
import { Icon, useTheme } from "react-native-paper";

export default function SearchBox(props: SearchBoxProps) {

    const theme = useTheme();

    return (
        <View style={{...styles.container, backgroundColor: theme.colors.onSecondaryContainer}}>
            <Icon source={"magnify"} size={20} color={theme.colors.onSecondary} />
            <TextInput style={styles.textInput} placeholder="Search..."/>  
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderRadius: 5,
        height: "auto",
        width: "100%",
        gap: 5,
    },
    textInput: {
        borderBottomWidth: 0,
        width: "100%",
    }
});