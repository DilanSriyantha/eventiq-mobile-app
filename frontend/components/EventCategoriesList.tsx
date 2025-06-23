import { FlatList, Image, ImageSourcePropType, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text, TouchableRipple } from "react-native-paper";

interface EventCategoriesListProps {
    onChange: () => void | Promise<void>;
};

interface CategoryButtonProps {
    onClick: () => void | Promise<void>;
    caption: string;
    image: ImageSourcePropType;
};

export default function EventCategoriesList({ onChange }: EventCategoriesListProps) {

    const CategoryButton = (props: CategoryButtonProps) => (
        <TouchableOpacity onPress={props.onClick}>
            <Surface style={styles.categoryButton} mode="flat">
                <Image style={styles.categoryButtonImage} source={props.image} />
                <Text variant="bodySmall">{props.caption}</Text>
            </Surface>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsVerticalScrollIndicator={false}>
                <CategoryButton 
                    onClick={() => {}}  
                    caption={"Birthday"}
                    image={require("../assets/images/bday.png")}    
                />
                <CategoryButton 
                    onClick={() => {}}  
                    caption={"Wedding"}
                    image={require("../assets/images/wedding.png")}    
                />
                <CategoryButton 
                    onClick={() => {}}  
                    caption={"Gathering"}
                    image={require("../assets/images/gathering.png")}    
                />
                <CategoryButton 
                    onClick={() => {}}  
                    caption={"Other"}
                    image={require("../assets/images/other.png")}    
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
    categoryButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        width: 100,
        marginEnd: 10
    },
    categoryButtonImage: {
        width: 48,
        height: 48,
    }
});