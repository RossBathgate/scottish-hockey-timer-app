import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "./Button";
import colors from "../../constants/colors";

// expects array of string <options>
const Select = (props) => {
    const [selectedOption, setSelectedOption] = useState(
        props.options ? props.options[0] : null
    );

    const optionPressHandler = (option) => {
        setSelectedOption(option);
        props.onChangeItem(option);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.label}</Text>
            <View style={styles.optionsContainer}>
                {props.options &&
                    props.options.map((option) => (
                        <Button
                            style={{
                                ...styles.optionButton,
                                backgroundColor:
                                    selectedOption === option
                                        ? colors.buttonBackgrounds.paleGreen
                                        : colors.buttonBackgrounds.grey,
                            }}
                            key={option}
                            title={option}
                            onPress={() => {
                                optionPressHandler(option);
                            }}
                        />
                    ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        justifyContent: "space-around",
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    optionButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    text: { fontSize: 30, marginBottom: 5, color: "rgba(50, 50, 50, 1)" },
});

export default Select;
