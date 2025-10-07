import { ReactNode } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export interface ParallaxViewWrapperProps {
    children: ReactNode;
    image?: string;
    title: string;
    subTitle: string;
    onBackPress: () => void;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};