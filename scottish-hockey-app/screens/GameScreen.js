import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

const GameScreen = (props) => {
    const [isGameStart, setIsGameStart] = useState(false);
    const [isQuarterStart, setIsQuarterStart] = useState(false);
    const [quarterNr, setQuarterNr] = useState(1);

    const timer = useTimer();

    const startGameHandler = () => {
        setIsGameStart(true);
        setIsQuarterStart(true);
        setQuarterNr(0);
        startQuarterHandler();
    };

    const endGameHandler = () => {
        setIsGameStart(false);
        setIsQuarterStart(false);
        //
        timer.pauseTimer();
    };

    const startQuarterHandler = () => {
        setQuarterNr((currentQuarterNr) => currentQuarterNr + 1);
        setIsQuarterStart(true);

        timer.resumeTimer();
    };

    const endQuarterHandler = () => {
        setIsQuarterStart(false);
    };

    const pauseGameHandler = () => {
        if (timer.isActive) {
            timer.pauseTimer();
        } else {
            timer.resumeTimer();
        }
    };

    return (
        <View style={styles.gameScreen}>
            <ControlBar
                isGameStart={isGameStart}
                quarterNr={quarterNr}
                isQuarterStart={isQuarterStart}
                onStartGame={startGameHandler}
                onEndGame={endGameHandler}
                onStartQuarter={startQuarterHandler}
                onEndQuarter={endQuarterHandler}
                time={timer.time}
                isPaused={!timer.isActive}
                onPauseToggle={pauseGameHandler}
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
