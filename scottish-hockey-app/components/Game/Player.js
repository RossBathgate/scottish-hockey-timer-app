import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import Colors from "../../constants/colors";
import TimerDisplay from "./TimerDisplay/TimerDisplay";

const Player = (props) => {
    const onPitch = true; //handle this using props once implemented
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.onPlayerPress(props.playerNumber);
            }}
        >
            <View style={styles.container}>
                <View style={styles.playerNo}>
                    <Text>#{props.playerNumber}</Text>
                </View>
                <View style={styles.timerContainers}>
                    {onPitch ? (
                        <TimerDisplay timerType='P' />
                    ) : (
                        <TimerDisplay timerType='B' />
                    )}
                    <TimerDisplay timerType='quarter' />
                    <TimerDisplay timerType='fullGame' />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,1)",
        backgroundColor: "rgba(100,100,100,0.05)",
    },
    playerNo: {
        backgroundColor: Colors.playerNrColor,
        padding: 5,
        borderRadius: 10,
    },
    timerContainers: {
        justifyContent: "center",
    },
});

export default Player;
