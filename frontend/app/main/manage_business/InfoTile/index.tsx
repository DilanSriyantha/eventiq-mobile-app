import { memo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator, Surface, Text } from "react-native-paper";
import { InfoTileProps } from "./types";

const InfoTile = ({ number, description, source, loading }: InfoTileProps) => {

    return (
        <Surface mode="flat" style={styles.container}>
            {
                loading ? (
                    <View style={styles.content}>
                        <ActivityIndicator
                            animating
                            size={"small"}
                        />
                    </View>
                ) : (
                    <View style={styles.content}>
                        <View style={styles.numberContainer}>
                            <Text variant="headlineMedium">{number}</Text>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text variant="bodyLarge">{description}</Text>
                        </View>
                    </View>
                )
            }
            <View style={styles.imgContainer}>
                <Image
                    source={source}
                    style={styles.img}
                />
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        paddingVertical: 80,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        minHeight: 100,
        position: "relative",
    },
    content: {
        justifyContent: "center",
        alignItems: "flex-start",
        position: "absolute",
        top: 10,
        left: 10,
    },
    numberContainer: {
    },
    descriptionContainer: {
    },
    imgContainer: {
        position: "absolute",
        zIndex: -1,
        end: 0,
        bottom: 0,
    },
    img: {
        width: 100,
        height: 100,
    },
});

export default memo(InfoTile);