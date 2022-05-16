import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "../../UI/Card";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import PausePlayButton from "./PausePlayButton";
import QuarterButtons from "./QuarterButtons";
import StartEndGameButtons from "./StartEndGameButtons";

const ControlBar = (props) => {
    const [isGameStart, setIsGameStart] = useState(false);
    const [isQuarterStart, setIsQuarterStart] = useState(false);
    const [quarterNr, setQuarterNr] = useState(1);

    const startGameHandler = () => {
        setIsGameStart(true);
        props.onGameStart();

        setQuarterNr(0);
        startQuarterHandler();
    };

    const endGameHandler = () => {
        setIsGameStart(false);
        endQuarterHandler();
    };

    const startQuarterHandler = () => {
        setQuarterNr((currentQuarterNr) => currentQuarterNr + 1);
        setIsQuarterStart(true);
        props.onQuarterStart();
    };

    const endQuarterHandler = () => {
        setIsQuarterStart(false);
        props.onQuarterEnd();
    };

    return (
        <View style={styles.controlBar}>
            {/* pause / resume buttons */}
            {isGameStart && (
                <Card style={styles.card}>
                    <PausePlayButton
                        isPaused={props.isPaused}
                        onPauseToggle={props.onPauseToggle}
                    />
                </Card>
            )}

            {/* start / end quarter buttons */}
            {isGameStart && quarterNr <= 3 && (
                <QuarterButtons
                    isQuarterStart={isQuarterStart}
                    startQuarterHandler={startQuarterHandler}
                    endQuarterHandler={endQuarterHandler}
                />
            )}

            {/* start / end game buttons */}
            <Card style={styles.card}>
                <StartEndGameButtons
                    isGameStart={isGameStart}
                    startGameHandler={startGameHandler}
                    endGameHandler={endGameHandler}
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
