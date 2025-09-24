import { memo } from "react";
import { DescriptionCompProps } from "./types";
import ContentBlock from "../../CreateEvent/ContentBlock";
import { View } from "react-native";
import { Text } from "react-native-paper";

function DescriptionComp({ description }: DescriptionCompProps) {

    return (
        <ContentBlock>
            <View style={{ gap: 10, }}>
                <Text variant="headlineMedium" style={{ fontWeight: "bold" }}>Description</Text>
                <Text variant="bodyLarge">{description}</Text>
            </View>
        </ContentBlock >
    );
}

export default memo(DescriptionComp);