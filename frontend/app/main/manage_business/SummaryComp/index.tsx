import { usePosts } from "@/context/PostsProvider";
import { useProviderServices } from "@/context/ProviderServicesProvider";
import { useCurrentUser } from "@/context/UserProvider";
import { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import InfoTile from "../InfoTile";
import { Summary, SummaryCompProps } from "./types";

const SummaryComp = ({ style }: SummaryCompProps) => {
    const [summary, setSummary] = useState<Summary | null>(null);

    const [user] = useCurrentUser();

    const posts = usePosts();
    const services = useProviderServices();

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = useCallback(async () => {
        if (!user) return;

        try {
            const np = await posts.getCountByProvider(user.email);
            const ns = await services.getCountByProvider(user.email);
            setSummary({ services: ns, posts: np });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <View style={{ ...styles.container, ...style }}>
            <View style={styles.block}>
                <InfoTile
                    number={summary ? summary.services : -1}
                    description="Services"
                    source={require("../../../../assets/images/services_olive_green.png")}
                    loading={!summary}
                />
            </View>

            <View style={styles.block}>
                <InfoTile
                    number={summary ? summary.posts : -1}
                    description="Posts"
                    source={require("../../../../assets/images/posts_olive_green.png")}
                    loading={!summary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 10
    },
    block: {
        flex: 1,
    }
});

export default memo(SummaryComp);