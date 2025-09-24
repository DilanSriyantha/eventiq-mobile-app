import { AnimatedCustomizedFABHandle } from "@/components/AnimatedCustomizedFAB";
import FABGroup from "@/components/FABGroup";
import { GeneralOptionsPanelHandle } from "@/components/GeneralOptionsPanel";
import ParallaxViewWrapper from "@/components/ParallaxViewWrapper/index";
import { useServiceProviders } from "@/context/ServiceProvidersProvider";
import { ServiceProvider } from "@/context/ServiceProvidersProvider/types";
import { useSnackbar } from "@/context/SnackbarProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import RatingSection from "./RatingSection";
import ServicesSection from "./ServicesSection";
import WelcomeSection from "./WelcomeSection";

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

function ProviderOverview() {
    const { providerId } = useLocalSearchParams();

    const [serviceProvider, setServiceProvider] = useState<ServiceProvider | null>(null);

    const FABRef = useRef<AnimatedCustomizedFABHandle>(null);
    const GeneralOptionsPanelRef = useRef<GeneralOptionsPanelHandle>(null);

    const router = useRouter();
    const snackbar = useSnackbar();
    const serviceProviders = useServiceProviders();

    useEffect(() => {
        fetchServiceProvider();
    }, []);

    async function fetchServiceProvider() {
        try {
            const sp = await serviceProviders.getOneByProviderId(providerId as any);

            setServiceProvider(sp);
        } catch (err) {
            console.log(err);

            snackbar.showError(err instanceof Error ? err.message : "An unknown error occurred");
        }
    }

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        const isBottomReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isBottomReached)
            if (GeneralOptionsPanelRef.current !== null)
                GeneralOptionsPanelRef.current?.loadMore.apply(null, []);

        FABRef.current?.handleScroll(event);
    }, []);

    const handleItemClick = useCallback((item: any) => {
        router.push("/providers/ProductOverview");
    }, []);

    return (
        <>
            {
                !serviceProvider
                    ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                animating
                                size={"large"}
                            />
                        </View>
                    ) : (
                        <>
                            <ParallaxViewWrapper
                                title={serviceProvider.title}
                                subTitle={`${serviceProvider.rating.toFixed(1)}`}
                                image={item.image}
                                onScroll={handleScroll}
                                onBackPress={router.back}
                            >
                                <View style={styles.bottomSectionContainer}>

                                    <WelcomeSection
                                        welcomNote={serviceProvider.welcomeNote}
                                        tags={serviceProvider.tags}
                                    />

                                    <RatingSection
                                        value={serviceProvider.rating}
                                    />

                                    <ServicesSection
                                        providerId={serviceProvider.id}
                                    />

                                </View>
                            </ParallaxViewWrapper >
                            <FABGroup
                                icon={"plus"}
                                actions={[
                                    {
                                        icon: "star",
                                        label: "Rate",
                                        onPress: () => console.log("rate pressed")
                                    },
                                    {
                                        icon: "email",
                                        label: "Message",
                                        onPress: () => console.log("message pressed")
                                    }
                                ]}
                            />
                        </>
                    )
            }
        </>
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
        gap: 25,
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default memo(ProviderOverview);