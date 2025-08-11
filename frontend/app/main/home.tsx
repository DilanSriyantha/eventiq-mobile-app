import EventCategoriesList from "@/components/EventCategoryList/EventCategoriesList";
import PostType1, { PostType1Props } from "@/components/PostType1";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Searchbar } from "react-native-paper";

const POSTS_01: PostType1Props[] = [
    {
        title: "River Green Restaurant",
        image: "https://wallpapers.com/images/hd/birthday-celebration-pictures-x42xac7kijps2q3j.jpg",
        rating: 4.6,
        tags: ["Birthday", "Restaurent", "Cheap", "Family"],
        onRatePress: () => { },
        onCheckPress: () => { }
    },
    {
        title: "Jayarathne Wedding Hall",
        image: "https://media.istockphoto.com/id/2168707868/photo/indian-couple-holding-hand-close-up-in-wedding-ceremony.jpg?s=612x612&w=0&k=20&c=ZIz18bUyWZaJwmiKs9CbxPhanXR7rbvsEpIrECNMvKo=",
        rating: 3.9,
        tags: ["Wedding", "Family", "A/C", "Generator"],
        onRatePress: () => { },
        onCheckPress: () => { }
    },
    {
        title: "Khalifa's Pub",
        image: "https://i.guim.co.uk/img/media/1bda5c0989738b83acee3044b5f3e79fac7a1705/0_213_3936_2362/master/3936.jpg?width=1200&quality=85&auto=format&fit=max&s=bc28da3bb4929f14691ffd1777ba952d",
        rating: 4.7,
        tags: ["Party", "Gathering", "18+", "Alcohol"],
        onRatePress: () => { },
        onCheckPress: () => { }
    },
];

export default function Home() {
    const [searchKey, setSearchKey] = useState<string>("");

    const router = useRouter();

    function handleCheckPress() {
        router.push("/providers?title=provider_overview" as any);
    }

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder={"Search..."}
                onChangeText={() => { }}
                value={searchKey}
            />
            <EventCategoriesList onChange={() => { }} />
            <FlatList
                data={POSTS_01}
                renderItem={({ item }) => <PostType1  {...item} onCheckPress={handleCheckPress} />}
                keyExtractor={(_item, idx) => `${idx}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        gap: 15,
    },
});