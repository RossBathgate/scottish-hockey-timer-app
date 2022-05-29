import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import ButtonText from "./ButtonText";

/*
    Generic Button UI Element.
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
                {props.icon}
                <ButtonText style={props.textStyle && props.textStyle}>
                    {props.title}
                </ButtonText>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default Button;
