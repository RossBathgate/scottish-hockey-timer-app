import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "../../UI/Card";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import PausePlayButton from "./PausePlayButton";
import QuarterButtons from "./QuarterButtons";
import StartEndGameButtons from "./StartEndGameButtons";
import fontSizes from "../../../constants/fontSizes";
import colors from "../../../constants/colors";

const ControlBar = (props) => {
    const togglePauseTimer = () => {
        if (props.timer.isActive) {
            props.timer.pauseTimer();
        } else {
            props.timer.resumeTimer();
        }
    };

    const startGameHandler = () => {
        props.dispatchPlayersInfo({ msg: "resetTimes" });
        props.dispatchQuarterInfo({ msg: "startGame" });
        props.onRefReset();
        props.timer.resetTimer();
        props.timer.resumeTimer();
    };

    const endGameHandler = () => {
        props.dispatchQuarterInfo({ msg: "endGame" });
        props.timer.pauseTimer();
    };

    const startQuarterHandler = () => {
        props.dispatchPlayersInfo({
            msg: "updatePreviousTotalQuarterTimes",
            time: props.timer.time,
        });
        props.dispatchQuarterInfo({
            msg: "startQuarter",
            time: props.timer.time,
        });
        props.timer.resumeTimer();
    };

    const endQuarterHandler = () => {
        props.dispatchQuarterInfo({ msg: "endQuarter" });

        if (props.timer.isActive) {
            props.timer.pauseTimer();
        }
    };

    const isGameRunning = props.quarterInfo.quarterNr !== -1;

    return (
        <View style={styles.controlBar}>
            {/* pause / resume buttons */}
            {props.quarterInfo.isQuarterRunning && isGameRunning && (
                <Card style={styles.card}>
                    <PausePlayButton
                        isPaused={!props.timer.isActive}
                        onPauseToggle={togglePauseTimer}
                    />
                </Card>
            )}

            {/* start / end quarter buttons */}
            {isGameRunning && props.quarterInfo.quarterNr <= 3 && (
                <QuarterButtons
                    isQuarterStart={props.quarterInfo.isQuarterRunning}
                    startQuarterHandler={startQuarterHandler}
                    endQuarterHandler={endQuarterHandler}
                />
            )}

            {/* start / end game buttons */}
            <Card style={styles.card}>
                <StartEndGameButtons
                    isGameStart={isGameRunning}
                    startGameHandler={startGameHandler}
                    endGameHandler={endGameHandler}
                />
            </Card>

            {/* quarter and fullGame timers */}
            <Card style={styles.card}>
                <TimerDisplay
                    nrSeconds={
                        props.timer.time - props.quarterInfo.mostRecentStart
                    }
                    style={styles.timer}
                    textStyle={{
                        fontSize: fontSizes.timerDisplay,
                        color: colors.timerColors.primary,
                    }}
                    timerType="quarter"
                />
                <TimerDisplay
                    nrSeconds={props.timer.time}
                    style={styles.timer}
                    textStyle={{
                        fontSize: fontSizes.timerDisplay,
                        color: colors.timerColors.primary,
                    }}
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
        height: "6%",
        backgroundColor: "white",
        borderBottomColor: "black",
        borderBottomWidth: 2,
        marginTop: 12, //account for status bar at top of iPads
    },
});

export default ControlBar;
