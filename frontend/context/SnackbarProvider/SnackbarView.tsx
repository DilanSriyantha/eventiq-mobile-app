import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Snackbar, Text, useTheme } from "react-native-paper";

export interface AlertOptions {
    message: string;
    type: "info" | "success" | "error" | "warning";
};

export interface SnackbarViewHandle {
    show: (options: AlertOptions) => void;
    hide: () => void;
};

const SnackbarView = forwardRef<SnackbarViewHandle, any>(({ }, ref) => {
    const [options, setOptions] = useState<AlertOptions | null>(null);

    const theme = useTheme();

    const handleVisible = useCallback((options: AlertOptions) => {
        setOptions(options);
    }, []);

    const handleDismiss = useCallback(() => {
        setOptions(null);
    }, []);

    useImperativeHandle(ref, () => ({
        show: handleVisible,
        hide: handleDismiss
    }));

    return (
        <View>
            <Snackbar
                visible={!!options}
                onDismiss={handleDismiss}
                style={{
                    backgroundColor: theme.colors.surface
                }}
            >
                {/* {options?.message} */}
                <View style={styles.content}>
                    <Icon
                        source={
                            options?.type === "success" ? "check-circle" :
                                options?.type === "error" ? "alert-circle" :
                                    options?.type === "warning" ? "alert" :
                                        "information"}
                        size={24}
                        color={
                            options?.type === "success" ? "#23a745" :
                                options?.type === "error" ? "#dc3545" :
                                    options?.type === "warning" ? "#ffc107" : "#007bff"
                        }
                    />
                    <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.onSurface }}
                    >{options?.message}</Text>
                </View>
            </Snackbar>
        </View>
    );
})

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    }
});

export default memo(SnackbarView);