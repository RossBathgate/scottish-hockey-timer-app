import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import TimerDisplay from "./TimerDisplay/TimerDisplay";

const Player = (props) => {
    const displayName =
        props.displayName.length < 10
            ? props.displayName
            : props.displayName.substring(0, 8) + "...";

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.onPress(props.playerNumber, props.formationIdx);
            }}
        >
            <View
                style={{
                    ...styles.container,
                    borderColor: props.borderColor,
                    backgroundColor: props.backgroundColor,
                    ...props.style,
                }}
            >
                {/* Player Number */}
                <View style={styles.playerNo}>
                    <Text
                        style={{
                            fontSize: fontSizes.playerNumber,
                            color: colors.timerColors.primary,
                        }}
                    >
                        {/* #{props.playerNumber} */}
                        {displayName}
                    </Text>
                </View>

                {/* Player Timers */}
                <View style={styles.timerContainers}>
                    {/* Display a P timer if on pitch, and a B timer of on bench */}
                    {props.onPitch ? (
                        <TimerDisplay
                            style={styles.timerDisplay}
                            textStyle={{
                                fontSize: fontSizes.playerTimerDisplays,
                                color: colors.timerColors.primary,
                            }}
                            timerType="P"
                            nrSeconds={props.pTime}
                        />
                    ) : (
                        <TimerDisplay
                            style={styles.timerDisplay}
                            textStyle={{
                                fontSize: fontSizes.playerTimerDisplays,
                                color: colors.timerColors.primary,
                            }}
                            timerType="B"
                            nrSeconds={props.bTime}
                        />
                    )}
                    <TimerDisplay
                        style={styles.timerDisplay}
                        textStyle={{
                            fontSize: fontSizes.playerTimerDisplays,
                            color: colors.timerColors.primary,
                        }}
                        timerType="quarter"
                        nrSeconds={props.quarterTime}
                    />
                    <TimerDisplay
                        style={styles.timerDisplay}
                        textStyle={{
                            fontSize: fontSizes.playerTimerDisplays,
                            color: colors.timerColors.primary,
                        }}
                        timerType="fullGame"
                        nrSeconds={props.fullTime}
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
        maxHeight: 140,
    },
    playerNo: {
        backgroundColor: colors.playerNrColor,
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
