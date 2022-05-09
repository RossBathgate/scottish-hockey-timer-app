import React from "react";
import { Text, StyleSheet } from "react-native";
import text from "../../constants/text";

/*
    Generic Text UI Element for consistent styling across all buttons.
*/
const ButtonText = (props) => {
    return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: text.button.fontSize,
        color: text.button.color,
        textAlign: "left",
    },
});

export default ButtonText;
