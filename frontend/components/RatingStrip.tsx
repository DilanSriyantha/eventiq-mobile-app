import { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors, Text } from "react-native-paper";

interface RatingStripProps {
    size: number;
    value?: number;
    adjustable?: boolean;
};

function RatingStrip({...props}: RatingStripProps){
    const [value, setValue] = useState<number>(props.value ? props.value : 0);

    useEffect(() => {
        console.log(value);
        console.log(Math.floor(value));
    }, [value]);

    const handleStarPress = useCallback((value: number) => {
        setValue(value);
    }, []); 

    const renderStars = () => {
        const stars = [];

        for(let i = 0; i < 5; i++) {
            if((i + 1) <= Math.floor(value)) {
                stars.push(
                    props.adjustable 
                    ? 
                        <TouchableOpacity onPress={() => handleStarPress(i + 1)}>
                            <Icon
                                source={"star"}
                                color={"#ffdf00"}
                                size={props.size}
                            />
                        </TouchableOpacity>
                    :
                        <Icon
                            source={"star"}
                            color={"#ffdf00"}
                            size={props.size}
                        />
                );
            }else if((value - Math.floor(value)) * 10 >= 5){
                stars.push(
                    props.adjustable 
                    ? 
                        <TouchableOpacity onPress={() => handleStarPress(i + 1)}>
                            <Icon
                                source={"star-half-full"}
                                color={"#ffdf00"}
                                size={props.size}
                            />
                        </TouchableOpacity>
                    :
                        <Icon
                            source={"star-half-full"}
                            color={"#ffdf00"}
                            size={props.size}
                        />
                );
            }else{
                stars.push(
                    props.adjustable 
                    ? 
                        <TouchableOpacity onPress={() => handleStarPress(i + 1)}>
                            <Icon
                                source={"star-outline"}
                                color={"#ffdf00"}
                                size={props.size}
                            />
                        </TouchableOpacity>
                    :
                        <Icon
                            source={"star-outline"}
                            color={"#ffdf00"}
                            size={props.size}
                        />
                );
            }
        }

        return stars;
    };

    return (
        <View>
            <View style={styles.starStackContainer}>
                {renderStars()}
                <View style={styles.valueContainer}>
                    <Text variant="bodyMedium">{value.toFixed(1)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    starStackContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    valueContainer: {
        paddingLeft: 10,
    },
});

export default memo(RatingStrip);