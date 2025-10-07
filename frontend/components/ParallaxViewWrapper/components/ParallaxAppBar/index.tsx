import { Appbar, useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { ParallaxAppBarProps } from "../types";

export default function ParallaxAppBar({ style, title, onBackPress }: ParallaxAppBarProps) {
    const theme = useTheme();

    return (
        <Animated.View style={[style, { position: "absolute", height: 100, top: 0, zIndex: 10000000, width: "100%", backgroundColor: theme.colors.primary }]}>
            <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
                <Appbar.BackAction onPress={onBackPress} color={theme.colors.onPrimary} />
                <Appbar.Content title={title} color={theme.colors.onPrimary} />
            </Appbar.Header>
        </Animated.View>
    );
}