import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

interface GeneralOptionProps {
    image: string;
    label: string;
    description: string;
};

function GeneralOption(props: GeneralOptionProps) {

    return (
        <Surface mode="flat" style={styles.container}>
            <Image source={{ uri: props.image }} style={styles.image} />
            <View style={styles.content}>
                <Text variant="bodyLarge">{props.label}</Text>
                <Text variant="bodyMedium" numberOfLines={3} ellipsizeMode="tail" style={{ maxWidth: 200, }}>{props.description}</Text>
            </View>
        </Surface>
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

export default memo(GeneralOption);