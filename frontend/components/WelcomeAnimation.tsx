import { WelcomeAnimationProps } from "@/types/types";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Animated, { Easing, runOnJS, useAnimatedProps, useDerivedValue, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const WINDOW_HEIGHT = height;

export default function WelcomeAnimated({ onGetStartedPress }: WelcomeAnimationProps) {

    const theme = useTheme();

    const fullText = "Welcome to EventiQ";

    const [typedText, setTypedText] = useState<string>("");
    const [txtPosY, setTxtPosY] = useState<number>(-WINDOW_HEIGHT/20);
    const [btnPosY, setBtnPosY] = useState<number>(-WINDOW_HEIGHT/20);
    const [btnOpac, setBtnOpacity] = useState<number>(0);

    const progress = useSharedValue(0);
    const dotProgress = useSharedValue(0);
    const txtPositionY = useSharedValue(-WINDOW_HEIGHT/20);
    const btnPositionY = useSharedValue(-WINDOW_HEIGHT/20);
    const btnOpacity = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(fullText.length, {
            duration: fullText.length * 100,
            easing: Easing.linear,
        });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dotProgress.value = withRepeat(
                withTiming(3, { duration: 1500, easing: Easing.linear }),
                -1,
                true
            );

        }, fullText.length * 100 + 200);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            txtPositionY.value = withTiming(-WINDOW_HEIGHT/10, { duration: 500, easing: Easing.inOut(Easing.quad) });
        }, fullText.length * 100 + 300);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            withSequence([
                btnOpacity.value = withTiming(1, { duration: 500, easing: Easing.inOut(Easing.quad) }),
                btnPositionY.value = withTiming(-WINDOW_HEIGHT/10, { duration: 500, easing: Easing.inOut(Easing.quad) }),
            ]);
        }, fullText.length * 100 + 900);

        return () => clearTimeout(timeout);
    }, []);

    useDerivedValue(() => {
        const count = Math.floor(progress.value);
        runOnJS(setTypedText)(fullText.slice(0, count));
    }, [progress]);

    useDerivedValue(() => {
        runOnJS(setTxtPosY)(txtPositionY.value);
    }, [txtPositionY]);

    useDerivedValue(() => {
        runOnJS(setBtnOpacity)(btnOpacity.value);
    }, [btnOpacity]);

    useDerivedValue(() => {
        runOnJS(setBtnPosY)(btnPositionY.value);
    }, [btnPositionY]);

    const animatedProps = useAnimatedProps(() => {
        const dots = ".".repeat(Math.floor(dotProgress.value));
        return {
            text: `${typedText}${progress.value >= fullText.length ? dots : ""}`,
        };
    }, [typedText]);

    return (
        <View style={styles.container}>
            <Animated.Text
                animatedProps={animatedProps as any}
                style={{...styles.animatedText, transform: [{ translateY: txtPosY }], color: theme.colors.primary}}
            >
                {typedText}
            </Animated.Text>
            <Button style={{ transform: [{ translateY: btnPosY+20 }], opacity: btnOpac }} mode="contained-tonal" onPress={onGetStartedPress ? () => onGetStartedPress() : () => {}}>Get started</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    animatedText: {
        fontSize: 28,
        fontWeight: '600',
    }
});