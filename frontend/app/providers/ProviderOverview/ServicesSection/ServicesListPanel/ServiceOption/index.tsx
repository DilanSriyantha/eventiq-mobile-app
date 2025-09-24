import { Image } from "expo-image";
import { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { ServiceOptionProps } from "./types";

function ServiceOption(props: ServiceOptionProps) {

    const handleClick = useCallback(() => {
        props.onClick?.apply(null, []);
    }, []);

    return (
        <TouchableOpacity onPress={handleClick}>
            <Surface mode="flat" style={styles.container}>
                <Image source={{ uri: props.imageUrl }} style={styles.image} />
                <View style={styles.content}>
                    <Text variant="bodyLarge">{props.title}</Text>
                    <Text variant="bodyMedium" numberOfLines={3} ellipsizeMode="tail" style={{ maxWidth: 200, }}>{props.description}</Text>
                </View>
            </Surface>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 5,
        padding: 10,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    content: {
        gap: 5,
    },
});

export default memo(ServiceOption);