import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ButtonText from "./ButtonText";

/*
    takes a title, icon, onPress handler, and optional style props.
*/
const Button = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View
                style={{
                    ...styles.buttonContainer,
                    ...props.style,
                }}
            >
                {/* {props.icon} */}
                <ButtonText>{props.title}</ButtonText>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

export default Button;
