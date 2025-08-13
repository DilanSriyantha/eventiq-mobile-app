import AnimatedCustomizedFAB from "@/components/AnimatedCustomizedFAB";
import CommentsSection from "@/components/CommentsSection";
import ParallaxViewWrapper from "@/components/ParallaxViewWrapper";
import RatingStrip from "@/components/RatingStrip";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const product = {
    title: "Family Option",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUZ-eb0TZMHSEwE4K_AZHrpkV-0vK6g2uWQ&s",
    rating: 4.6,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora recusandae ad at a excepturi fugiat ratione aspernatur ullam nostrum reprehenderit?",
    price: 2000,
}

export default function ProductOverview() {
    const router = useRouter();

    const handleAddPress = useCallback(() => {

    }, []);

    return (
        <>
            <ParallaxViewWrapper
                image={product.image}
                title={product.title}
                subTitle={""}
                onBackPress={router.back}
            >
                <View style={styles.content}>
                    <View style={styles.section}>
                        <View style={styles.sectionContentContainer}>
                            <Text variant="headlineMedium" style={styles.sectionTitle}>Description</Text>
                            <Text variant="bodyLarge">{product.description}</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionContentContainer}>
                            <Text variant="headlineMedium" style={styles.sectionTitle}>Rating</Text>
                            <RatingStrip 
                                value={product.rating}
                                size={24}
                            />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <View style={styles.sectionContentContainer}>
                            <Text variant="headlineMedium" style={styles.sectionTitle}>Comments</Text>
                            <CommentsSection />
                        </View>
                    </View>
                </View>
            </ParallaxViewWrapper>
            <AnimatedCustomizedFAB
                icon={"plus"}
                label={"Add"}
                animateFrom={"right"}
                iconMode={"dynamic"}
                onPress={handleAddPress}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 10,
        gap: 15,
    },
    section: {

    },
    sectionContentContainer: {
        gap: 10,
    },
    sectionTitle: {
        fontWeight: "bold",
    },
});