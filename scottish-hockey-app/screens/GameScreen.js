import React, { useState, useRef, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

const quarterReducer = (state, action) => {
    switch (action.msg) {
        case "startQuarter":
            return {
                quarterNr: state.quarterNr + 1,
                isQuarterRunning: true,
                mostRecentStart: action.time,
            };
        case "endQuarter":
            return { ...state, isQuarterRunning: false };
        case "startGame":
            return { quarterNr: 1, isQuarterRunning: true, mostRecentStart: 0 };
        case "endGame":
            return { ...state, quarterNr: -1, isQuarterRunning: false };
    }
};

const GameScreen = (props) => {
    const timer = useTimer();

    const [quarterInfo, dispatchQuarterInfo] = useReducer(quarterReducer, {
        quarterNr: -1,
        isQuarterRunning: false,
        mostRecentStart: 0,
    });

    return (
        <View style={styles.gameScreen}>
            <ControlBar
                quarterInfo={quarterInfo}
                dispatchQuarterInfo={dispatchQuarterInfo}
                timer={timer}
            />
            <Pitch />
            <Bench />
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreen: { flex: 1, flexDirection: "column" },
});

export default GameScreen;
