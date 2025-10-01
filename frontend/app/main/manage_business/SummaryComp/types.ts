import { ViewStyle } from "react-native";

export interface SummaryCompProps {
    style?: ViewStyle;
};

export type Summary = { posts: number, services: number };