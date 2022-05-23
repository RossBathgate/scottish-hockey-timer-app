import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../../constants/colors";

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
    text: { fontSize: 30, marginBottom: 5, color: "rgba(50, 50, 50, 1)" },
    textInput: {
        backgroundColor: colors.buttonBackgrounds.grey,
        padding: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 30,
        color: "rgba(50, 50, 50, 1)",
    },
});

export default FormInput;
