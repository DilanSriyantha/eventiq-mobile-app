import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ServiceCompProps } from "./types";
import { IconButton, Surface, Text, useTheme } from "react-native-paper";
import { Image } from "expo-image";
import { memo, useCallback } from "react";
import { useRouter } from "expo-router";

function ServiceComp(props: ServiceCompProps) {

    const router = useRouter();
    const theme = useTheme();

    const handleClick = useCallback(() => {
        router.push(`/providers/ProductOverview?psId=${props.serviceId}`);
    }, []);

    const handleRemoveClick = useCallback(() => {
        if (!props.onRemoveClick) return;

        props.onRemoveClick.apply(null, [props.eventId, props.serviceId]);
    }, []);

    return (
        <TouchableOpacity onPress={handleClick}>
            <Surface mode="flat" style={styles.container}>
                <Image source={{ uri: props.imageUrl }} style={styles.image} />
                <View style={styles.content}>
                    <Text variant="bodyLarge">{props.title}</Text>
                    <Text variant="bodyMedium" numberOfLines={3} ellipsizeMode="tail" style={{ maxWidth: 200, }}>{props.description}</Text>
                </View>
                <View style={styles.actionsContainer}>
                    <IconButton
                        icon={"close"}
                        iconColor={theme.colors.error}
                        size={20}
                        onPress={handleRemoveClick}
                    />
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
    actionsContainer: {
        flex: 1,
        alignItems: "flex-end",
        // backgroundColor: "red",
    },
});

export default memo(ServiceComp);