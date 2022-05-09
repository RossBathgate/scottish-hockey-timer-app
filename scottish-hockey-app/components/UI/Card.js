import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const Card = (props) => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.buttonBackgrounds.grey,
        padding: 5,
        borderRadius: 5,
    },
});

export default Card;
