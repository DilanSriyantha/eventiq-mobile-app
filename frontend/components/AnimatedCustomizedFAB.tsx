import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { AnimatedFAB } from "react-native-paper";

interface AnimatedCustomizedFABProps {
    icon: string;
    label: string
    animateFrom: "right" | "left";
    iconMode: "static" | "dynamic";
    onPress: () => void;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
};

export interface AnimatedCustomizedFABHandle {
    handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const AnimatedCustomizedFAB = forwardRef<AnimatedCustomizedFABHandle, AnimatedCustomizedFABProps>((props, ref) => {
    const [isExtended, setIsExtended] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        handleScroll: handleScroll,
    }));

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log("reached");

        const { contentOffset } = event.nativeEvent;

        const currentScrollPosition = Math.floor(contentOffset.y) ?? 0;

        setIsExtended(currentScrollPosition <= 0);
    }, []);

    return (
        <AnimatedFAB
            icon={props.icon}
            label={props.label}
            extended={isExtended}
            onPress={props.onPress}
            visible={true}
            animateFrom={props.animateFrom}
            iconMode={props.iconMode}
            style={[styles.fabStyle, props.style]}
        />
    );
});

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    fabStyle: {
        bottom: 16,
        right: 16,
        position: "absolute"
    }
});

export default AnimatedCustomizedFAB;