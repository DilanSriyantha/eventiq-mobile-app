import { ScrollView, StyleSheet } from "react-native";
import BusinessInfoComp from "./BusinessInfoComp";
import OptionsMenu from "./OptionsMenu";
import SummaryComp from "./SummaryComp";

export default function ManageBusiness({ }) {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <SummaryComp />
            <BusinessInfoComp style={{ paddingTop: 10 }} />
            <OptionsMenu style={{ paddingTop: 10 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    contentContainer: {
        paddingBottom: 20,
    },
});