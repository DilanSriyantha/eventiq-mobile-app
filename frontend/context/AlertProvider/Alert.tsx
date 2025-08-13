import { StyleSheet, View } from "react-native";
import { Modal } from "react-native-paper";

interface AlertProps {

};

export enum AlertType {
    INFO,
    ERROR,
    WARNING,
    SUCCESS
};

function Alert({ }: AlertProps) {

    return (
        <View>
            {/* <Modal

            >

            </Modal> */}
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Alert;