import { Image } from "expo-image";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";

interface FeaturedItemProps {
    label: string;
    image: string;
};  

function FeaturedOption(props: FeaturedItemProps) {

    return(
        <TouchableOpacity>
            <View style={styles.container}>
                <Image
                    source={{ uri: props.image }}
                    style={styles.image}
                />
                <Text variant="labelSmall" style={styles.labelText}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    labelText: {
        paddingTop: 3,
        fontWeight: "bold",
    }
});

export default memo(FeaturedOption);