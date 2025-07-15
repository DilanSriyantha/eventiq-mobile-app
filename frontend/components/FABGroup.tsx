import { memo, useState } from "react";
import { FAB } from "react-native-paper";

interface FABGroupProps {
    icon: string;
    actions: Array<{
        icon: string;
        label: string;
        onPress: () => void;
    }>
};

function FABGroup(props: FABGroupProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <FAB.Group
            open={open}
            visible
            icon={open ? "close" : props.icon}
            actions={props.actions}
            onStateChange={({open}) => setOpen(open)}
            onPress={() => setOpen(!open)}
        />
    );
}

export default memo(FABGroup);