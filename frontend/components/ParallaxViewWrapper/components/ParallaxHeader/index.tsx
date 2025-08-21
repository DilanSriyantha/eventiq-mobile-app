import { StyleSheet, View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { ParallaxHeaderProps } from "../types";

export default function ParallaxHeader({ title, subTitle, image, screenHeight, headerStyle, dividerStyle, imageStyle, onBackPress }: ParallaxHeaderProps) {
    const theme = useTheme();

    return (
        <Animated.View style={[headerStyle, { zIndex: 10000000 }]}>
            <View style={{ ...styles.headerContent, height: screenHeight * .3 }}>
                <View style={styles.imageOverlay}>
                    <View style={{ ...styles.backdrop, backgroundColor: theme.colors.backdrop }} />
                    <View style={{ position: "fixed", borderRadius: 100, marginTop: 50, zIndex: 10000000 }}>
                        <IconButton icon="arrow-left" onPress={onBackPress} iconColor={theme.colors.onPrimary} />
                    </View>*
                    <View style={styles.headerTextContainer}>
                        <Text variant="titleLarge" style={{ color: theme.colors.onPrimary }}>{title}</Text>
                        <Text variant="bodyMedium" style={{ color: theme.colors.onPrimary }}>{subTitle}</Text>
                    </View>
                    <Animated.View style={[{ ...styles.divider, backgroundColor: theme.colors.elevation.level1 }, dividerStyle]} />
                </View>
                <Animated.Image
                    style={[{ ...styles.imagebg, height: screenHeight * .3 }, imageStyle]}
                    source={{ uri: image }}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    headerContent: {
        overflow: "hidden"
    },
    imagebg: {
        resizeMode: "cover",
    },
    imageOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 100
    },
    backdrop: {
        height: "100%",
        position: "absolute",
        width: "100%",
        zIndex: -100
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    divider: {
        height: 20,
        bottom: -1,
        marginTop: "auto",
        position: "relative",
    }
});