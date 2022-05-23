import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import colors from "../../constants/colors";

const Header = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.background}></View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
};

// Calculate size corrections for header background
const screenWidth = Dimensions.get("window").width;
const rotAngleRadians = 0.15;
const verticalCorrection = Math.round(
    (screenWidth / 2) * Math.sin(rotAngleRadians)
);

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        color: "black",
        position: "relative",
        minHeight: 200
    },
    background: {
        width: screenWidth,
        backgroundColor: colors.headerColor,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        transform: [
            { rotateZ: `-${rotAngleRadians}rad` },
            { translateY: -verticalCorrection },
            { scaleX: 2}
        ],
    },
    text: {
        fontSize: 30,
        color: "white",
        padding: 20
    },
});

export default Header;
