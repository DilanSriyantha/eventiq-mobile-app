import { memo } from "react";
import { PaperProvider } from "react-native-paper";
import { useAppTheme } from "./ThemeProvider";
import { ThemeWrapperProps } from "./types";

function ThemeWrapper({ children }: ThemeWrapperProps) {
    const theme = useAppTheme();

    return (
        <PaperProvider theme={theme}>
            {children}
        </PaperProvider>
    );
}

export default memo(ThemeWrapper);