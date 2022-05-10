import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

const GameScreen = (props) => {
    const { times, pauseTimer, resumeTimer } = useTimer();
    console.log(times.totalTime);

    useEffect(() => {
        setTimeout(() => {
            pauseTimer();
            console.log("PAUSED");
        }, 5000);

        setTimeout(() => {
            resumeTimer();
            console.log("RESUMED");
        }, 10000);
    }, []);

    return (
        <View style={styles.gameScreen}>
            <ControlBar />
            <Pitch />
            <Bench />
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreen: { flex: 1, flexDirection: "column" },
});

export default GameScreen;
