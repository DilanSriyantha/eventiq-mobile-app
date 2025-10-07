import { ImageProps, ViewProps } from "react-native";

export interface ParallaxAppBarProps {
    title: string;
    style: ViewProps["style"];
    onBackPress: () => void;
};

export interface ParallaxHeaderProps {
    title: string;
    subTitle: string;
    image?: string;
    screenHeight: number;
    headerStyle: ViewProps["style"];
    dividerStyle: ViewProps["style"];
    imageStyle: ImageProps["style"];
    onBackPress: () => void;
};