import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Button, Card, Chip, Icon, Text } from "react-native-paper";

export interface PostType1Props {
    title: string;
    image: string;
    rating: number;
    tags: string[];
    onRatePress: () => void;
    onCheckPress: () => void;
};

const PostType1 = ({ title, image, rating, tags, onRatePress, onCheckPress }: PostType1Props) => {
    
    return (
        <TouchableOpacity style={styles.container}>
            <Card mode="contained">
                <Card.Cover resizeMode="cover" source={{ uri: image }} />
                <View style={styles.cardContentContainer}>
                    <Text variant="titleLarge" style={styles.title}>{title}</Text>
                    <View style={styles.ratingContainer}>
                        <Text variant="bodyLarge">{rating}</Text>
                        <Icon source={"star"} size={20} />
                    </View>
                </View>
                <View style={styles.tagsContainer}>
                    {
                        tags.map((tag, idx) => (
                            <Chip mode="outlined" key={idx}>{tag}</Chip>
                        ))
                    }
                </View>
                <Card.Actions>
                    <Button icon={"star-outline"} onPress={onRatePress}>Rate</Button>
                    <Button icon={"arrow-right"} onPress={onCheckPress}>Check</Button>
                </Card.Actions>
            </Card>
        </TouchableOpacity>
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

export default PostType1;