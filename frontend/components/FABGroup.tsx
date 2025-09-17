import { memo, useState } from "react";
import { FAB } from "react-native-paper";

type Action = {
    icon: string;
    label: string;
    onPress: () => void;
}

interface FABGroupProps {
    icon: string;
    actions: Action[];
};

function FABGroup(props: FABGroupProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <FAB.Group
            open={open}
            visible
            icon={open ? "close" : props.icon}
            actions={props.actions}
            onStateChange={({ open }) => setOpen(open)}
            onPress={() => setOpen(!open)}
        />
    );
}

export default memo(FABGroup);