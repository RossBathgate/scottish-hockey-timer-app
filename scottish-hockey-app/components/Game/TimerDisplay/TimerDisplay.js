import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TimerIcon from "./TimerIcon";

const TimerDisplay = (props) => {
    return (
        <View style={styles.container}>
            <TimerIcon type={props.timerType} />
            <Text>00:00</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
    },
});

export default TimerDisplay;
