import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import GeneralOption from "./GeneralOption";

export interface GeneralOptionsPanelHandle {
    loadMore: () => void;
};

interface GeneralOptionsPanelProps {
    onItemClick?: (item: GeneralOption) => void;
};

interface GeneralOption {
    image: string;
    label: string;
    description: string;
};

const GENERAL_OPTIONS: GeneralOption[] = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl16rkZ77uZBbI-AXXA1ZRFQ8GF9UMkB5GlQ&s",
        label: "General Option",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis reprehenderit necessitatibus quibusdam at expedita omnis nemo dolor, eos eveniet rerum."
    },
];

const GeneralOptionsPanel = forwardRef<GeneralOptionsPanelHandle, GeneralOptionsPanelProps>((props, ref) => {
    const [items, setItems] = useState<GeneralOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        loadMore: () => loadMore(),
    }));

    useEffect(() => {
        setItems(GENERAL_OPTIONS);
    }, []);

    const loadMore = useCallback(() => {
        if (loading) return;

        setLoading(true);

        const newItems: GeneralOption[] = [];
        for (let i = 0; i < 5; i++)
            newItems.push({
                image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202411/ideally--indians-should-have-how-many-meals-in-a-day-102825391-1x1.jpg?VersionId=3vDEbRDEuYsWLCwGwyffSTDGHY9Yrclw",
                label: "General Option",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt debitis distinctio ex dicta, dolore esse sunt quia delectus magnam."
            });
        setTimeout(() => {
            setItems((current) => [...current, ...newItems]);
            setLoading(false);
        }, 1000);
    }, [loading]);

    const handleItemClick = useCallback((item: GeneralOption) => {
        props.onItemClick?.apply(null, [item]);
    }, []);

    return (
        <View style={styles.container}>
            {items.map((go, idx) => (
                <GeneralOption key={idx} {...go} onClick={() => handleItemClick(go)} />
            ))}

            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size={"small"} />
                </View>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
    loading: {
        padding: 20,
        alignItems: "center"
    }
});

export default memo(GeneralOptionsPanel);