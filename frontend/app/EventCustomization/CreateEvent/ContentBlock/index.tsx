import { Surface } from "react-native-paper";
import { ContentBlockProps } from "./types";
import { StyleSheet } from "react-native";
import { memo } from "react";

function ContentBlock({ children }: ContentBlockProps) {

    return (
        <Surface mode="flat" style={styles.contentBlock}>
            {children}
        </Surface>
    );
}

const styles = StyleSheet.create({
    contentBlock: {
        padding: 10,
        borderRadius: 5
    }
});

export default memo(ContentBlock);