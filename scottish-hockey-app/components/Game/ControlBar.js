import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ControlBar = (props) => {
    return <View style={styles.controlBar}></View>;
};

const styles = StyleSheet.create({
    controlBar: {
        height: "8%",
        backgroundColor: "white", 
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
});

export default ControlBar;
