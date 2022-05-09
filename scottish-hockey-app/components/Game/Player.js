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
                        <TimerDisplay
                            style={styles.timerDisplay}
                            timerType="P"
                        />
                    ) : (
                        <TimerDisplay
                            style={styles.timerDisplay}
                            timerType="B"
                        />
                    )}
                    <TimerDisplay
                        style={styles.timerDisplay}
                        timerType="quarter"
                    />
                    <TimerDisplay
                        style={styles.timerDisplay}
                        timerType="fullGame"
                    />
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
        backgroundColor: "rgba(255,255,255,0.35)",
    },
    playerNo: {
        backgroundColor: Colors.playerNrColor,
        padding: 5,
        borderRadius: 10,
    },
    timerContainers: {
        justifyContent: "center",
    },
    timerDisplay: {
        minWidth: 80,
    },
});

export default Player;
