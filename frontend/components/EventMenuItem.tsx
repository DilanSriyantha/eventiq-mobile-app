import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";

export interface EventMenuItemProps {
    id: number;
    title: string;
    date: string;
};

const EventMenuItem = (props: EventMenuItemProps) => {

    const LeftContent = (p: any) => <Avatar.Icon {...p} icon="folder" />
    return (
        <TouchableOpacity>
            <Card mode="contained">
                <Card.Title title={props.title} subtitle={props.date} left={LeftContent} />
            </Card>
        </TouchableOpacity>
    );
};

export default memo(EventMenuItem);