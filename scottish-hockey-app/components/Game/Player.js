import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../constants/colors";
import Colors from "../../constants/colors";
import TimerDisplay from "./TimerDisplay/TimerDisplay";

const Player = (props) => {
    const onPitch = true; //handle this using props once implemented
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
                        : colors.playerBorderColor,
                    backgroundColor: props.isHighlighted
                        ? colors.playerHighlightColor
                        : colors.playerBackgroundColor,
                }}
            >
                <View style={styles.playerNo}>
                    <Text>#{props.playerNumber}</Text>
                </View>
                <View style={styles.timerContainers}>
                    {onPitch ? (
                        <TimerDisplay
                            style={styles.timerDisplay}
                            timerType="P"
                            nrSeconds={10000}
                        />
                    ) : (
                        <TimerDisplay
                            style={styles.timerDisplay}
                            timerType="B"
                            nrSeconds={0}
                        />
                    )}
                    <TimerDisplay
                        style={styles.timerDisplay}
                        timerType="quarter"
                        nrSeconds={0}
                    />
                    <TimerDisplay
                        style={styles.timerDisplay}
                        timerType="fullGame"
                        nrSeconds={0}
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
