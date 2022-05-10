import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../UI/Card";
import Button from "../UI/Button";
import TimerDisplay from "./TimerDisplay/TimerDisplay";
import PlayIconSVG from "../../assets/playIcon.svg";
import PauseIconSVG from "../../assets/pauseIcon.svg";
import sizes from "../../constants/sizes";

/*
    Expects in props:
    totalElapsedTime
*/
const ControlBar = (props) => {
    const [isGameStart, setIsGameStart] = useState(false);
    const [isQuarterStart, setIsQuarterStart] = useState(false);

    const startGameHandler = () => {
        setIsGameStart(true);
        setIsQuarterStart(true);
        props.onStartGame();
    };
    const endGameHandler = () => {
        setIsGameStart(false);
        setIsQuarterStart(false);
    };
    const endQuarterHandler = () => {
        setIsQuarterStart(false);
    };
    const startQuarterHandler = () => {
        setIsQuarterStart(true);
    };

    return (
        <View style={styles.controlBar}>
            <Card style={styles.card}>
                <Button
                    icon={
                        <PauseIconSVG
                            width={sizes.pauseResumeButtonSizes}
                            height={sizes.pauseResumeButtonSizes}
                        />
                    }
                    onPress={props.onPauseToggle}
                />
                <Button
                    icon={
                        <PlayIconSVG
                            width={sizes.pauseResumeButtonSizes}
                            height={sizes.pauseResumeButtonSizes}
                        />
                    }
                    onPress={() => {}}
                />
            </Card>
            {isGameStart && (
                <Card style={styles.card}>
                    {isQuarterStart ? (
                        <Button
                            onPress={endQuarterHandler}
                            title="END QUARTER"
                        />
                    ) : (
                        <Button
                            onPress={startQuarterHandler}
                            title="START QUARTER"
                        />
                    )}
                </Card>
            )}
            <Card style={styles.card}>
                {
                    // Determine whether to display start or end game buttons
                    !isGameStart ? (
                        <Button onPress={startGameHandler} title="START GAME" />
                    ) : (
                        <Button onPress={endGameHandler} title="END GAME" />
                    )
                }
            </Card>
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
