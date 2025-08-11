import { forwardRef, useState, useImperativeHandle, memo, useCallback, useRef } from "react";
import { View, Dimensions, StyleSheet, TextInputProps } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useSharedValue, withTiming, useDerivedValue, runOnJS, Easing } from "react-native-reanimated";

interface AnimatedInputProps {
    title: string;
    keyboardType?: TextInputProps["keyboardType"];
    inputMode?: TextInputProps["inputMode"];
    secureTextEntry?: boolean;
    onTextChange?: (text: string) => void;
};

export interface AnimatedInputHandle {
    in: () => void;
    out: () => void;
    reset: () => void;
    isShowing: () => boolean;
    getInput: () => string;
};

const WINDOW_WIDTH = Dimensions.get("window").width;

const AnimatedInput = forwardRef<AnimatedInputHandle, AnimatedInputProps>((props, ref) => {
    const [posX, setPosX] = useState<number>(-WINDOW_WIDTH);
    const [input, setInput] = useState<string>("");

    const posXShared = useSharedValue(-WINDOW_WIDTH);

    useImperativeHandle(ref, () => ({
        in: handleIn,
        out: handleOut,
        reset: handleReset,
        isShowing: () => { return posX === 0 },
        getInput: () => { return input }
    }));

    function handleIn() {
        posXShared.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.quad) });
    }

    function handleOut() {
        posXShared.value = withTiming(WINDOW_WIDTH, { duration: 500, easing: Easing.inOut(Easing.quad) });
    }

    function handleReset() {
        posXShared.value = withTiming(-WINDOW_WIDTH, { duration: 500, easing: Easing.inOut(Easing.quad) });
    }

    useDerivedValue(() => {
        runOnJS(setPosX)(posXShared.value);
    }, [posXShared]);

    const handleTextChange = useCallback((text: string) => {
        props.onTextChange?.apply(null, [text]);
        setInput(text);
    }, []);

    return (
        <View style={[styles.container, { transform: [{ translateX: posX }] }]}>
            <Text variant="headlineMedium" style={styles.header}>{props.title}</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    mode="outlined"
                    onChangeText={handleTextChange}
                    keyboardType={props.keyboardType}
                    inputMode={props.inputMode}
                    secureTextEntry={props.secureTextEntry}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
    },
    textInputContainer: {
        marginTop: 50,
    },
    header: {
        fontWeight: "500",
    },
});

export default memo(AnimatedInput);