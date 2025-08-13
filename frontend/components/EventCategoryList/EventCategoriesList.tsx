import { useState } from "react";
import { ImageSourcePropType, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import CategoryButton from "./CategoryButton";

interface EventCategoriesListProps {
    onChange: () => void | Promise<void>;
};

interface Category {
    id: number;
    caption: string;
    image: ImageSourcePropType;
};

const CATEGORY_OPTIONS: Category[] = [
    {
        id: 0,
        caption: "Birthday",
        image: require("../../assets/images/bday.png"),
    },
    {
        id: 1,
        caption: "Wedding",
        image: require("../../assets/images/wedding.png"),
    },
    {
        id: 2,
        caption: "Gathering",
        image: require("../../assets/images/gathering.png"),
    },
    {
        id: 3,
        caption: "Other",
        image: require("../../assets/images/other.png"),
    },
];

export default function EventCategoriesList({ onChange }: EventCategoriesListProps) {
    const [selected, setSelected] = useState<number>(0);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsVerticalScrollIndicator={false}>
                {CATEGORY_OPTIONS.map((co, idx) => (
                    <CategoryButton
                        key={idx}
                        caption={co.caption}
                        image={co.image}
                        selected={co.id === selected}
                        onClick={() => setSelected(co.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
});