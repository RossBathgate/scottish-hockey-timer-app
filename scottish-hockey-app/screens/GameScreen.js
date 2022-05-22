import React, { useState, useRef, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

const tempDefaultPlayersInfo = [
    {
        formationIdx: 0,
        playerNumber: 0,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        // !!! MAY NOT ACTUALLY BE USED !!!
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 1,
        playerNumber: 1,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 2,
        playerNumber: 2,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 3,
        playerNumber: 3,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 4,
        playerNumber: 4,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 5,
        playerNumber: 5,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 6,
        playerNumber: 6,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 7,
        playerNumber: 7,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 8,
        playerNumber: 8,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: 9,
        playerNumber: 9,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: -1,
        playerNumber: 10,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: -1,
        playerNumber: 11,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: -1,
        playerNumber: 12,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: -1,
        playerNumber: 13,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
    {
        formationIdx: -1,
        playerNumber: 14,
        mostRecentSwitch: 0,
        previousTotalPitchTime: 0,
        previousQuarterPitchTime: 0,
        totalTimeOfAllPreviousQuarters: 0,
    },
];

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

const playerReducer = (state, action) => {
    // copy state so that a "new" state is returned every time, resulting in a re-render
    let stateCopy = [...state];

    switch (action.msg) {
        case "resetTimes":
            stateCopy.map((player) => {
                player.mostRecentSwitch = 0;
                player.previousTotalPitchTime = 0;
                player.previousQuarterPitchTime = 0;
                player.totalTimeOfAllPreviousQuarters = 0;
                return player;
            });

            return stateCopy;

        // !!! MAY NOT ACTUALLY BE USED !!!
        case "resetQuarterTimes":
            stateCopy.map((player) => {
                player.previousQuarterPitchTime = 0;
                return player;
            });

            return stateCopy;

        case "updatePreviousTotalQuarterTimes":
            stateCopy.map((player) => {
                const fullTime =
                    player.formationIdx !== -1
                        ? player.previousTotalPitchTime +
                          action.time -
                          player.mostRecentSwitch
                        : player.previousTotalPitchTime;

                player.totalTimeOfAllPreviousQuarters = fullTime;
            });
            return stateCopy;

        case "swap":
            // find formation index of highlighed player
            const highlightedFormationIdx = state.find(
                (player) =>
                    player.playerNumber ===
                    action.playerNumbers.highlightedPlayerNumber
            ).formationIdx;

            // swap the players, set mostRecentSwitch,
            // set previous total pitch and quarter times of the player moving to the bench.
            stateCopy.map((player) => {
                if (
                    player.playerNumber ===
                    action.playerNumbers.benchPlayerNumber
                ) {
                    player.formationIdx = highlightedFormationIdx;
                    player.mostRecentSwitch = action.time;
                } else if (
                    player.playerNumber ===
                    action.playerNumbers.highlightedPlayerNumber
                ) {
                    player.formationIdx = -1;
                    const pTime = action.time - player.mostRecentSwitch;
                    player.previousTotalPitchTime =
                        player.previousTotalPitchTime + pTime;
                    player.mostRecentSwitch = action.time;
                }
                return player;
            });

            return stateCopy;
    }
};

const GameScreen = (props) => {
    const timer = useTimer();

    const [quarterInfo, dispatchQuarterInfo] = useReducer(quarterReducer, {
        quarterNr: -1,
        isQuarterRunning: false,
        mostRecentStart: 0,
    });

    const [playersInfo, dispatchPlayersInfo] = useReducer(
        playerReducer,
        tempDefaultPlayersInfo
    );

    const [highlightedPlayer, setHighlightedPlayer] = useState(null);

    const pitchPlayerPressHandler = (playerNumber) => {
        setHighlightedPlayer((prevNumber) =>
            prevNumber !== playerNumber ? playerNumber : null
        );
    };

    const benchPlayerPressHandler = (benchPlayerNumber) => {
        if (highlightedPlayer !== null) {
            dispatchPlayersInfo({
                msg: "swap",
                time: timer.time,
                playerNumbers: {
                    benchPlayerNumber: benchPlayerNumber,
                    highlightedPlayerNumber: highlightedPlayer,
                },
            });
        }

        setHighlightedPlayer(null);
    };

    return (
        <View style={styles.gameScreen}>
            <ControlBar
                quarterInfo={quarterInfo}
                dispatchQuarterInfo={dispatchQuarterInfo}
                dispatchPlayersInfo={dispatchPlayersInfo}
                timer={timer}
            />
            <Pitch
                onPitchPlayerPress={pitchPlayerPressHandler}
                highlightedPlayer={highlightedPlayer}
                players={playersInfo.filter(
                    (player) => player.formationIdx !== -1
                )}
                timer={timer}
            />
            <Bench
                onBenchPlayerPress={benchPlayerPressHandler}
                players={playersInfo.filter(
                    (player) => player.formationIdx === -1
                )}
                timer={timer}
                isPitchPlayerHighlighted={highlightedPlayer !== null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreen: { flex: 1, flexDirection: "column" },
});

export default GameScreen;
