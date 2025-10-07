import { ReactNode } from "react";
import { LightTheme } from "./theme";

export type ThemeType = typeof LightTheme;

export type ThemeProviderType = { theme: ThemeType };

export interface ThemeProviderProps {
    children: ReactNode;
};

export interface ThemeWrapperProps {
    children: ReactNode;
};