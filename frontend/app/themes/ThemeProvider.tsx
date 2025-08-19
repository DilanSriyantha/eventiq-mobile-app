import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "./theme";
import { ThemeProviderProps, ThemeProviderType } from "./types";

const ThemeContext = createContext(
    {} as ThemeProviderType
);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? DarkTheme : LightTheme;

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useAppTheme() {
    const themeCtx = useContext(ThemeContext);

    if (!themeCtx)
        throw new Error("useAppTheme hook must be used within a <ThemeProvider>");

    return themeCtx.theme;
}