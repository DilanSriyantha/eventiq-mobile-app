import moment from "moment";
import { memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

export interface EventMenuItemProps {
    id: number;
    title: string;
    date: string;
    description: string;
    onClick: () => void;
};

const EventMenuItem = (props: EventMenuItemProps) => {

    const LeftContent = (p: any) => <Avatar.Icon {...p} icon="folder" />

    const calculateDaysLeft = useCallback((date: string) => {
        const today = new Date(Date.now());
        const eventDate = new Date(date);

        if(moment(today).isAfter(moment(eventDate)))
            return "Passed";

        const difference = moment(eventDate).diff(moment(today), "days", false);

        return `${difference} days left`;
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={props.onClick}>
            <Card mode="contained">
                <Card.Title title={props.title} subtitle={calculateDaysLeft(props.date)} left={LeftContent} />
                <Card.Content>
                    <Text variant="labelSmall" numberOfLines={1} ellipsizeMode="tail">{props.description}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
});

export default memo(EventMenuItem);