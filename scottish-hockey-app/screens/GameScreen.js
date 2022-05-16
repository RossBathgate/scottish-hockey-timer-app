import React from "react";
import { View, StyleSheet } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

const GameScreen = (props) => {
    const timer = useTimer();

    const initialSetupHandler = () => {
        timer.resetTimer();
    };

    const quarterStartHandler = () => {
        timer.resumeTimer();
    };

    const quarterEndHandler = () => {
        timer.pauseTimer();
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
                onGameStart={initialSetupHandler}
                onQuarterStart={quarterStartHandler}
                onQuarterEnd={quarterEndHandler}
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
