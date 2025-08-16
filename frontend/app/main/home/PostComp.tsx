import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Icon, Text } from "react-native-paper";
import { PostProps } from "./types";

const Post = ({ title, imageUrl, rate, tags, onRatePress, onCheckPress }: PostProps) => {

    return (
        <Card style={styles.container} mode="contained">
            <Card.Cover resizeMode="cover" source={{ uri: imageUrl }} />
            <View style={styles.cardContentContainer}>
                <Text variant="titleLarge" style={styles.title}>{title}</Text>
                <View style={styles.ratingContainer}>
                    <Text variant="bodyLarge">{rate}</Text>
                    <Icon source={"star"} size={20} />
                </View>
            </View>
            <View style={styles.tagsContainer}>
                {
                    tags.split(",").map((tag, idx) => (
                        <Chip mode="outlined" key={idx}>{tag.trim()}</Chip>
                    ))
                }
            </View>
            <Card.Actions>
                <Button icon={"star-outline"} onPress={onRatePress}>Rate</Button>
                <Button icon={"arrow-right"} onPress={onCheckPress}>Check</Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
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