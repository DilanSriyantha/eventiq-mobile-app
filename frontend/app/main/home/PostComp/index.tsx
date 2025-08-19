import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Chip, Icon, IconButton, Text, useTheme } from "react-native-paper";
import { PostProps } from "../types";

const Post = ({ post, onRatePressed, onCheckPressed }: PostProps) => {

    const theme = useTheme();

    return (
        <TouchableOpacity onPress={() => onCheckPressed?.apply(null, [post])}>
            <Card style={styles.container} mode="contained">
                <View style={styles.coverContainer}>
                    {/* <View style={styles.overlay} /> */}
                    <View style={styles.options}>
                        <IconButton icon={"star-outline"} iconColor={theme.colors.primary} onPress={() => onRatePressed?.apply(null, [post])} />
                    </View>
                    <Card.Cover resizeMode="cover" source={{ uri: post.imageUrl }} />
                </View>
                <View style={styles.cardContentContainer}>
                    <Text variant="titleLarge" style={styles.title}>{post.title}</Text>
                    <View style={styles.ratingContainer}>
                        <Text variant="bodyLarge">{post.rate}</Text>
                        <Icon source={"star"} size={20} />
                    </View>
                </View>
                <View style={styles.tagsContainer}>
                    {
                        post.tags.split(",").map((tag, idx) => (
                            <Chip mode="outlined" key={idx}>{tag.trim()}</Chip>
                        ))
                    }
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    coverContainer: {
        position: "relative",
    },
    overlay: {
        backgroundColor: "#00000050",
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: "30%",
    },
    options: {
        position: "absolute",
        zIndex: 2,
        width: "100%",
        alignItems: "flex-end",
    },
    cardContentContainer: {
        padding: 5,
    },
    title: {
        fontWeight: "500",
    },
    ratingContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    tagsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        padding: 5,
    }
});

export default Post;