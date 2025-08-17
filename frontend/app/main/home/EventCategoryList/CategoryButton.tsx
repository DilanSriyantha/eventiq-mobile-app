import { memo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { CategoryButtonProps } from "./types";

function CategoryButton(props: CategoryButtonProps){
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={props.onClick}>
            <Surface style={[{ ...styles.categoryButton }, { backgroundColor: props.selected ? theme.colors.primary : theme.colors.elevation[0] }]} mode="flat">
                <Image style={styles.categoryButtonImage} source={props.image} />
                <Text variant="bodySmall" style={{ color: props.selected ? theme.colors.onPrimary : theme.colors.onBackground }}>{props.caption}</Text>
            </Surface>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    categoryButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        width: 100,
        marginEnd: 10
    },
    categoryButtonImage: {
        width: 48,
        height: 48,
    }
});

export default memo(CategoryButton);