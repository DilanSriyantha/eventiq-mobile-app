import { Post } from "@/context/PostsProvider/types";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import EventCategoriesList from "./EventCategoryList";
import { Category, EventCategoriesListHandle } from "./EventCategoryList/types";
import PostsList from "./PostsList";
import SearchBox from "./SearchBox";
import { SearchBoxHandle } from "./SearchBox/types";

export default function Home() {
    const [searchKey, setSearchKey] = useState<string>("");

    const searchBoxRef = useRef<SearchBoxHandle>(null);
    const categoryListRef = useRef<EventCategoriesListHandle>(null);

    const router = useRouter();

    function handleCheckPress(post: Post) {
        router.push(`/providers?title=provider_overview&providerId=${post.providerId}` as any);
    }

    const onCategoryChange = useCallback((category: Category) => {
        if (category.caption.toLowerCase() === "all") {
            setSearchKey("");
            return;
        }

        searchBoxRef.current?.reset();
        setSearchKey(category.caption.toLowerCase());
    }, []);

    const handleSearchKeySubmit = useCallback((text: string) => {
        categoryListRef.current?.reset();
        setSearchKey(text);
    }, []);

    return (
        <View style={styles.container}>
            <SearchBox ref={searchBoxRef} onSubmit={handleSearchKeySubmit} />
            <EventCategoriesList ref={categoryListRef} onChange={onCategoryChange} />
            <PostsList
                searchKey={searchKey}
                onItemCheckPressed={handleCheckPress}
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