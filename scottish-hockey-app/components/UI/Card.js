import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import colors from "../../constants/colors";

const Card = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View
                onPress={props.onPress}
                style={{ ...styles.container, ...props.style }}
            >
                {props.children}
            </View>
        </TouchableWithoutFeedback>
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
