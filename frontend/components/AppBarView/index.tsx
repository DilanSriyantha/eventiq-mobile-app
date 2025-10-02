import { memo } from "react"
import { StyleSheet } from "react-native";
import { AppBarViewProps } from "./types";
import { Appbar, Surface } from "react-native-paper";
import { useRouter } from "expo-router";

const AppBarView = ({ title, children }: AppBarViewProps) => {
    const router = useRouter();

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={title} />
            </Appbar.Header>

            <Surface mode="flat" style={styles.container}>
                {children}
            </Surface>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
});

export default memo(AppBarView);