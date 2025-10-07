import { useCallback } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import Animated, { useSharedValue } from "react-native-reanimated";
import ParallaxAppBar from "./components/ParallaxAppBar";
import ParallaxHeader from "./components/ParallaxHeader";
import { useAppBarOpacity, useDividerRadius, useParallaxHeader, useParallaxImage, useScrollViewHeight } from "./hooks/useParallaxAnimations";
import { ParallaxViewWrapperProps } from "./types";

const SCREEN_HEIGHT = Dimensions.get("window").height + 60;

export default function ParallaxViewWrapper(props: ParallaxViewWrapperProps) {
    const theme = useTheme();

    const scrollY = useSharedValue(0);

    const appBarStyle = useAppBarOpacity(scrollY);
    const scrollViewAnimatedStyle = useScrollViewHeight(scrollY, SCREEN_HEIGHT);
    const imageHeaderAnimatedStyle = useParallaxHeader(scrollY, SCREEN_HEIGHT);
    const dividerBorderStyle = useDividerRadius(scrollY);
    const imageAnimatedStyle = useParallaxImage(scrollY);

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.value = event.nativeEvent.contentOffset.y;

        props.onScroll?.apply(null, [event]);
    }, []);

    return (
        <Surface style={{ ...styles.container }}>
            <ParallaxAppBar
                title={props.title}
                onBackPress={props.onBackPress}
                style={appBarStyle}
            />
            <Animated.ScrollView style={scrollViewAnimatedStyle} onScroll={handleScroll} showsVerticalScrollIndicator={false}>
                <ParallaxHeader
                    title={props.title}
                    subTitle={props.subTitle}
                    image={props.image}
                    screenHeight={SCREEN_HEIGHT}
                    headerStyle={imageHeaderAnimatedStyle}
                    dividerStyle={dividerBorderStyle}
                    imageStyle={imageAnimatedStyle}
                    onBackPress={props.onBackPress}
                />
                <View style={styles.content}>
                    {props.children}
                </View>
            </Animated.ScrollView>
        </Surface>
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
});