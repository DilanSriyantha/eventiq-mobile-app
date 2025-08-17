import { ImageSourcePropType } from "react-native";

export interface EventCategoriesListProps {
    onChange: (category: Category) => void | Promise<void>;
};

export type EventCategoriesListHandle = {
    select: (idx: number) => void;
    reset: () => void;
};

export interface Category {
    id: number;
    caption: string;
    image: ImageSourcePropType;
};