import { ReactNode, useCallback } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { Appbar, IconButton, Text, useTheme } from "react-native-paper";
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

interface ParallaxViewWrapperProps {
    children: ReactNode;
    image: string;
    title: string;
    subTitle: string;
    onBackPress: () => void;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const SCREEN_HEIGHT = Dimensions.get("window").height + 60;

export default function ParallaxViewWrapper(props: ParallaxViewWrapperProps) {
    const theme = useTheme();

    const scrollY = useSharedValue(0);

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.value = event.nativeEvent.contentOffset.y;

        props.onScroll?.apply(null, [event]);
    }, []);

    const imageHeaderAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, 320],
            [0, SCREEN_HEIGHT * .3]
        );

        return {
            transform: [{ translateY: -translateY }],
        };
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollY.value,
            [0, 320],
            [1.5, 1]
        );

        return {
            transform: [
                {
                    scaleX: scale,
                },
                {
                    scaleY: scale,
                }
            ]
        };
    });

    const dividerBorderStyle = useAnimatedStyle(() => {
        const radius = interpolate(
            scrollY.value,
            [0, 100],
            [50, 0]
        );

        return {
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
        };
    });

    const scrollViewAnimatedStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, 320],
            [0, SCREEN_HEIGHT * .6]
        );

        return {
            height: height,
        }
    });

    const appBarStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [100, 130],
            [0, 1]
        );

        return {
            opacity: opacity
        };
    });

    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
            <Animated.View style={[appBarStyle, { position: "absolute", height: 100, top: 0, zIndex: 1, width: "100%" }]}>
                <Appbar.Header>
                    <Appbar.BackAction onPress={props.onBackPress} />
                    <Appbar.Content title={props.title} />
                </Appbar.Header>
            </Animated.View>
            <Animated.ScrollView style={scrollViewAnimatedStyle} onScroll={handleScroll} showsVerticalScrollIndicator={true}>
                <Animated.View style={imageHeaderAnimatedStyle}>
                    <View style={styles.headerContent}>
                        <View style={styles.imageOverlay}>
                            <View style={styles.backdrop} />
                            <View style={{ position: "fixed", borderRadius: 100, marginTop: 50, zIndex: 1000 }}>
                                <IconButton icon="arrow-left" onPress={props.onBackPress}/>
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text variant="titleLarge">{props.title}</Text>
                                <Text variant="bodyMedium">{props.subTitle}</Text>
                            </View>
                            <Animated.View style={[{ ...styles.divider, backgroundColor: theme.colors.background }, dividerBorderStyle]} />
                        </View>
                        <Animated.Image
                            style={[styles.imagebg, imageAnimatedStyle]}
                            source={{ uri: props.image }}
                        />
                    </View>
                </Animated.View>
                <View style={styles.content}>
                    {props.children}
                </View>
                {/* <View style={{ height: Dimensions.get("window").height * 2 }} /> */}
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        gap: 10,
        padding: 10,
        marginBottom: 60,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
    headerContent: {
        height: SCREEN_HEIGHT * .3,
        overflow: "hidden"
    },
    imagebg: {
        height: SCREEN_HEIGHT * 0.3,
        resizeMode: "cover",
    },
    imageOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 100
    },
    backdrop: {
        backgroundColor: "#000",
        opacity: .5,
        height: "100%",
        position: "absolute",
        width: "100%",
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