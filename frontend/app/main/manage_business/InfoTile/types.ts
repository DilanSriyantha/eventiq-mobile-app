import { ImageSourcePropType } from "react-native";

export interface InfoTileProps {
    number: number;
    description: string;
    source: ImageSourcePropType;
    loading?: boolean;
};