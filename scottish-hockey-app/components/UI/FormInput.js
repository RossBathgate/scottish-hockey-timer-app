import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

const FormInput = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.label}</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(newText) => props.onChangeText(newText)}
                value={props.inputValue}
                keyboardType={props.keyboardType}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        justifyContent: "space-around",
        alignItems: "flex-start",
    },
    text: {
        fontSize: fontSizes.formLabel,
        marginBottom: 5,
        color: "rgba(50, 50, 50, 1)",
    },
    textInput: {
        backgroundColor: colors.buttonBackgrounds.grey,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: fontSizes.formInputText,
        color: "rgba(50, 50, 50, 1)",
        borderBottomColor: "rgba(50, 50, 50, 1)",
        borderBottomWidth: 2,
    },
});

export default FormInput;
