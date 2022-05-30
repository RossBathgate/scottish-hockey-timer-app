import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import Button from "./Button";

const Modal = (props) => {
    return (
        <View
            style={{
                alignItems: "center",
                backgroundColor: colors.modalBackdrop,
                position: "fixed",
                zIndex: 10,
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
            }}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>{props.msg}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    {props.btnOneTitle && (
                        <Button
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={props.onBtnOnePress}
                            title={props.btnOneTitle}
                        />
                    )}
                    {props.btnTwoTitle && (
                        <Button
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={props.onBtnTwoPress}
                            title={props.btnTwoTitle}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "fixed",
        top: "33%",
        width: "80%",
        zIndex: 100,
        backgroundColor: colors.modalBackground,
        marginHorizontal: "auto",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        borderRadius: 20,
        shadowRadius: 3,
        overflow: "hidden",
    },
    titleContainer: {
        backgroundColor: colors.modalTitleBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    titleText: {
        fontSize: fontSizes.modalTitle,
        color: colors.timerColors.primary,
    },
    messageContainer: { padding: 20 },
    messageText: {
        fontSize: fontSizes.modalMsg,
        color: colors.timerColors.primary,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
    },
    button: {
        backgroundColor: colors.buttonBackgrounds.grey,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: fontSizes.modalBtn,
        color: colors.timerColors.primary,
    },
});

export default Modal;
