import { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

export function useParallaxHeader(scrollY: SharedValue<number>, screenHeight: number) {
    return useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollY.value,
            [0, 320],
            [0, screenHeight * .3]
        );

        return {
            transform: [{ translateY: -translateY }],
        };
    });
}

export function useParallaxImage(scrollY: SharedValue<number>) {
    return useAnimatedStyle(() => {
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
}

export function useDividerRadius(scrollY: SharedValue<number>) {
    return useAnimatedStyle(() => {
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
}

export function useScrollViewHeight(scrollY: SharedValue<number>, screenHeight: number) {
    return useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, 320],
            [0, screenHeight * .6]
        );

        return {
            height: height,
        }
    });
}

export function useAppBarOpacity(scrollY: SharedValue<number>) {
    return useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [100, 130],
            [0, 1]
        );

        return {
            opacity: opacity,
        };
    });
}