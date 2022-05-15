import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../../UI/Card";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import PausePlayButton from "./PausePlayButton";
import QuarterButtons from "./QuarterButtons";
import StartEndGameButtons from "./StartEndGameButtons";

const ControlBar = (props) => {
    return (
        <View style={styles.controlBar}>
            {/* pause / resume buttons */}
            {props.isGameStart && (
                <Card style={styles.card}>
                    <PausePlayButton
                        isPaused={props.isPaused}
                        onPauseToggle={props.onPauseToggle}
                    />
                </Card>
            )}

            {/* start / end quarter buttons */}
            {props.isGameStart && props.quarterNr <= 3 && (
                <QuarterButtons
                    isQuarterStart={props.isQuarterStart}
                    startQuarterHandler={props.onStartQuarter}
                    endQuarterHandler={props.onEndQuarter}
                />
            )}

            {/* start / end game buttons */}
            <Card style={styles.card}>
                <StartEndGameButtons
                    isGameStart={props.isGameStart}
                    startGameHandler={props.onStartGame}
                    endGameHandler={props.onEndGame}
                />
            </Card>

            {/* quarter and fullGame timers */}
            <Card style={styles.card}>
                <TimerDisplay
                    nrSeconds={0}
                    style={styles.timer}
                    timerType="quarter"
                />
                <TimerDisplay
                    nrSeconds={props.time}
                    style={styles.timer}
                    timerType="fullGame"
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        height: "100%",
    },
    timer: {
        minWidth: 65,
        marginHorizontal: 10,
    },
    controlBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        height: "4%",
        backgroundColor: "white",
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
});

export default ControlBar;
