import ParallaxViewWrapper from "@/components/ParallaxViewWrapper";
import { ManagableEvent } from "@/types/types";
import { useLocalSearchParams, useRouter } from "expo-router/build/hooks";
import moment from "moment";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Surface, Text} from "react-native-paper";

const BogusData: ManagableEvent[] = [
    {
        id: 0,
        title: "My Event 01",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
    {
        id: 1,
        title: "My Event 02",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
    {
        id: 2,
        title: "My Event 03",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
    {
        id: 3,
        title: "My Event 04",
        date: "2025-08-02",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro omnis ipsum assumenda inventore atque sunt libero nihil consequatur voluptates molestiae.",
        components: [],
    },
];

const calculateDaysLeft = (event: ManagableEvent): string => {
    const today = new Date(Date.now());
    const eventDate = new Date(event.date);

    if(moment(today).isAfter(eventDate)) return `Passed (${event.date})`;

    if(moment(today).isSame(eventDate)) return `Today`;

    const daysLeft = moment(eventDate).diff(moment(today), "days", false);

    return `${daysLeft} days left`;
};

export default function EventOverview() {
    const router = useRouter();

    const { id }: any = useLocalSearchParams();

    const event = BogusData[id];
    
    const daysLeft = useMemo(() => calculateDaysLeft(event), [event]);

    const handleAddPress = useCallback(() => {
        router.replace("/main/home");
    }, []);

    return (
        <ParallaxViewWrapper
            image="https://thumbs.dreamstime.com/b/vector-panoramic-landscape-purple-blue-misty-mountains-vector-panoramic-landscape-purple-blue-misty-mountains-140806239.jpg?w=768"
            title={event.title}
            subTitle={daysLeft}
            onBackPress={router.back}
        >
            <>
                <Surface mode="flat" style={styles.contentBlock}>
                    <View style={{ gap: 10, }}>
                        <Text variant="bodyLarge">Description</Text>
                        <Text variant="bodyMedium">{event.description}</Text>
                    </View>
                </Surface>
                <Surface mode="flat" style={styles.contentBlock}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text variant="bodyLarge">Services</Text>
                        <Button mode="text" icon={"plus"} onPress={handleAddPress}>Add</Button>
                    </View>
                </Surface>
            </>
        </ParallaxViewWrapper>
    );
}

const styles = StyleSheet.create({
    contentBlock: {
        padding: 10,
        borderRadius: 5,
    }
});