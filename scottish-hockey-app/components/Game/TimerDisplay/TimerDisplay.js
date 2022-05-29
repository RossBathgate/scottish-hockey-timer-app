import React from "react";
import { View, StyleSheet, Text } from "react-native";
import TimerIcon from "./TimerIcon";

/*
 Expects:
 nrSeconds
*/
const TimerDisplay = (props) => {
    const minutesRaw = Math.floor(props.nrSeconds / 60).toString();
    let hours = Math.floor(minutesRaw / 60).toString();
    let minutes = (Math.floor(props.nrSeconds / 60) % 60).toString();
    let seconds = (props.nrSeconds % 60).toString();

    if (hours.length <= 1) {
        hours = "0" + hours;
    }

    if (minutes.length <= 1) {
        minutes = "0" + minutes;
    }

    if (seconds.length <= 1) {
        seconds = "0" + seconds;
    }

    return (
        <View style={{ ...styles.container, ...props.style }}>
            <TimerIcon type={props.timerType} />
            <Text style={{ ...props.textStyle }}>
                {hours > 0 ? hours + " : " : ""} {minutes} : {seconds}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // minWidth: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
    },
});

export default TimerDisplay;
