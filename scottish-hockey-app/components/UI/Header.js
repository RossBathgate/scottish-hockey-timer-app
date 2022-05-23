import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

const Header = (props) => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.headerColor,
        padding: 20,
        minHeight: 200,
    },
});

export default Header;
