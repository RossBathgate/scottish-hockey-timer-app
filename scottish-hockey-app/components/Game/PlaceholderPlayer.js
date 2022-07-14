import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";

const PlaceholderPlayer = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.onPress(props.playerNumber);
            }}
        >
            <View
                style={{
                    ...styles.container,
                    borderColor: props.isHighlighted
                        ? colors.playerHighlightBorderColor
                        : colors.placeholderPlayerBorderColor,
                    backgroundColor: props.isHighlighted
                        ? colors.playerHighlightColor
                        : colors.placeholderPlayerBackgroundColor,
                    ...props.style,
                }}
            ></View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        height: sizes.playerHeight,
    },
});

export default PlaceholderPlayer;
