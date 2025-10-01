import { useRouter } from "expo-router";
import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";
import { OptionsMenuProps } from "./types";

const OptionsMenu = ({ style }: OptionsMenuProps) => {
    const router = useRouter();

    return (
        <View style={{ ...styles.container, ...style }}>
            <List.Item
                title="Manage Business Info"
                right={props => <List.Icon {...props}
                    icon="chevron-right" />}
                onPress={() => router.push("/business_customization/ManageBusinessInfo")}
            />
            <List.Item
                title="Manage Posts"
                right={props => <List.Icon {...props}
                    icon="chevron-right" />}
                onPress={() => router.push("/business_customization/ManagePosts")}
            />
            <List.Item
                title="Manage Services/Products"
                right={props => <List.Icon {...props}
                    icon="chevron-right" />}
                onPress={() => router.push("/business_customization/ManageServices")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    }
});

export default memo(OptionsMenu);