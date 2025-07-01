import FeaturedOption from "@/components/FeaturedOption";
import GeneralOptionsPanel, { GeneralOptionsPanelHandle } from "@/components/GeneralOptionsPanel";
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useRef } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from "react-native";
import { Chip, Icon, Text, useTheme } from "react-native-paper";

const item = {
    title: "River Green Restaurant",
    image: "https://wallpapers.com/images/hd/birthday-celebration-pictures-x42xac7kijps2q3j.jpg",
    rating: 4.6,
    tags: ["Birthday", "Restaurent", "Cheap", "Family"],
    email: "res.rgr@gmail.com",
    telephone: "+94 70 123 1234",
    address: "1st Avenue, Grove St., LA",
    featuredOptions: [
        {
            label: "Family Option",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUZ-eb0TZMHSEwE4K_AZHrpkV-0vK6g2uWQ&s"
        },
        {
            label: "Family Option",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUZ-eb0TZMHSEwE4K_AZHrpkV-0vK6g2uWQ&s"
        },
        {
            label: "Family Option",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUZ-eb0TZMHSEwE4K_AZHrpkV-0vK6g2uWQ&s"
        },
        {
            label: "Family Option",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlUZ-eb0TZMHSEwE4K_AZHrpkV-0vK6g2uWQ&s"
        },
    ],
    generalOptions: [
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
    ]
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Overview() {
    const GeneralOptionsPanelRef = useRef<GeneralOptionsPanelHandle>(null);

    const router = useRouter();
    const theme = useTheme();

    const handleBackPress = useCallback(() => {
        router.back();
    }, []);

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isBottomReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isBottomReached)
            if (GeneralOptionsPanelRef.current !== null)
                GeneralOptionsPanelRef.current.loadMore();
    }, []);

    return (
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16} style={{ backgroundColor: theme.colors.background }}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <ImageBackground
                        source={item.image}
                        style={styles.imageBackground}
                        contentFit="cover"
                    >
                        <View style={styles.overlay} />
                        <View style={styles.titleContainer}>
                            <Text variant="displaySmall" style={{ color: "#d5d5d5" }}>{item.title}</Text>
                            <View style={styles.ratingContainer}>
                                <Text variant="labelMedium" style={{ color: "#d5d5d5" }}>{item.rating}</Text>
                                <Icon source="star" size={14} color="#d5d5d5" />
                            </View>
                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.bottomSection}>
                    <View style={styles.bottomSectionContainer}>
                        <View style={styles.section}>
                            <View style={styles.sectionContentContainer}>
                                <Text variant="headlineMedium" style={styles.sectionTitle}>Welcome</Text>
                                <Text variant="bodyLarge">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit vitae fugiat quaerat sit in repellat. Eaque perspiciatis beatae accusantium amet.</Text>
                                <View style={styles.tagContainer}>
                                    {item.tags.map((tag, idx) => (
                                        <Chip mode="outlined" key={idx}>{tag}</Chip>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionContentContainer}>
                                <Text variant="headlineMedium" style={styles.sectionTitle}>Featured</Text>
                                <FlatList
                                    data={item.featuredOptions}
                                    renderItem={({ item }) => <FeaturedOption {...item} />}
                                    keyExtractor={(_item, idx) => `${idx}`}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={styles.sectionContentContainer}>
                                <Text variant="headlineMedium" style={styles.sectionTitle}>General Options</Text>
                                <GeneralOptionsPanel ref={GeneralOptionsPanelRef} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButtonContainer: {
        flex: 1,
        paddingTop: 60,
        // backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        width: "100%",
        zIndex: 100000
    },
    rightSideActionButtonsContainer: {
        flexDirection: "row",
    },
    topSection: {
        height: SCREEN_HEIGHT * .35,
    },
    imageBackground: {
        flex: 1,
        justifyContent: "flex-end",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    titleContainer: {
        padding: 16,
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    bottomSection: {
        padding: 16,
    },
    bottomSectionContainer: {
        padding: 10,
        gap: 20,
    },
    section: {

    },
    sectionContentContainer: {
        gap: 10,
    },
    sectionTitle: {
        fontWeight: "bold"
    },
    titleText: {
        fontWeight: "bold",
    },
    tagContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 5,
    },
    contactContainer: {

    },
    contactRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
});