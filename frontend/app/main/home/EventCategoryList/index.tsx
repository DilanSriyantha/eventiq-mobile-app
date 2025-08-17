import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CategoryButton from "./CategoryButton";
import { Category, EventCategoriesListHandle, EventCategoriesListProps } from "./types";

const CATEGORY_OPTIONS: Category[] = [
    {
        id: 0,
        caption: "All",
        image: require("../../../../assets/images/other.png"),
    },
    {
        id: 1,
        caption: "Birthday",
        image: require("../../../../assets/images/bday.png"),
    },
    {
        id: 2,
        caption: "Wedding",
        image: require("../../../../assets/images/wedding.png"),
    },
    {
        id: 3,
        caption: "Gathering",
        image: require("../../../../assets/images/gathering.png"),
    },
];

const EventCategoriesList = forwardRef<EventCategoriesListHandle, EventCategoriesListProps>(({ onChange }, ref) => {
    const [selected, setSelected] = useState<number>(0);

    useImperativeHandle(ref, () => ({
        select: handleSelect,
        reset: handleReset,
    }));

    const handleSelect = useCallback((idx: number) => {
        setSelected(idx);
        onChange?.apply(null, [CATEGORY_OPTIONS[idx]]);
    }, []);

    const handleReset = useCallback(() => {
        setSelected(0);
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsVerticalScrollIndicator={false}>
                {CATEGORY_OPTIONS.map((co, idx) => (
                    <CategoryButton
                        key={idx}
                        caption={co.caption}
                        image={co.image}
                        selected={co.id === selected}
                        onClick={() => handleSelect(idx)}
                    />
                ))}
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
});

export default memo(EventCategoriesList);