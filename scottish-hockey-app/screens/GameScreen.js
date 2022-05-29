import React, { useState, useRef, useReducer, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

// import playersData from "../data/playerData.json";

const quarterReducer = (state, action) => {
    switch (action.msg) {
        case "startQuarter":
            return {
                ...state,
                quarterNr: state.quarterNr + 1,
                isQuarterRunning: true,
                mostRecentStart: action.time,
                isQuarterEnded: false,
            };
        case "endQuarter":
            return { ...state, isQuarterRunning: false, isQuarterEnded: true };
        case "startGame":
            return {
                ...state,
                quarterNr: 1,
                isQuarterRunning: true,
                mostRecentStart: 0,
                isGameEnded: false,
            };
        case "endGame":
            return {
                ...state,
                quarterNr: -1,
                isQuarterRunning: false,
                isGameEnded: true,
            };
    }
};

const playerReducer = (state, action) => {
    // copy state so that a "new" state is returned every time, resulting in a re-render
    let stateCopy = [...state];

    switch (action.msg) {
        case "resetTimes":
            stateCopy.forEach((player) => {
                player.mostRecentSwitch = 0;
                player.previousTotalPitchTime = 0;
                player.previousQuarterPitchTime = 0;
                player.totalTimeOfAllPreviousQuarters = 0;
                return player;
            });

            return stateCopy;

        // !!! MAY NOT ACTUALLY BE USED !!!
        case "resetQuarterTimes":
            stateCopy.forEach((player) => {
                player.previousQuarterPitchTime = 0;
                return player;
            });

            return stateCopy;

        case "updatePreviousTotalQuarterTimes":
            stateCopy.forEach((player) => {
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

            // find position of highlighted player
            const highlighedPosition = state.find(
                (player) =>
                    player.playerNumber ===
                    action.playerNumbers.highlightedPlayerNumber
            ).position;

            // swap the players, and update their
            stateCopy.forEach((player) => {
                if (
                    player.playerNumber ===
                    action.playerNumbers.benchPlayerNumber
                ) {
                    player.formationIdx = highlightedFormationIdx;
                    player.position = highlighedPosition;
                    player.mostRecentSwitch = action.time;
                } else if (
                    player.playerNumber ===
                    action.playerNumbers.highlightedPlayerNumber
                ) {
                    player.formationIdx = -1;
                    player.position = "Bench";
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
    // Player information gathered from the player data screen
    const playersData = props.playersDataRef.current;

    // The central timer used to control the game
    const timer = useTimer();

    const [quarterInfo, dispatchQuarterInfo] = useReducer(quarterReducer, {
        quarterNr: -1,
        isQuarterRunning: false,
        mostRecentStart: 0,
    });

    const [playersInfo, dispatchPlayersInfo] = useReducer(
        playerReducer,
        playersData
    );

    // Used for swapping players between the pitch and the bench.
    const [highlightedPlayer, setHighlightedPlayer] = useState(null);

    // Update information for the game summary page
    if (
        !quarterInfo.isQuarterRunning &&
        (quarterInfo.quarterNr !== -1 ||
            (quarterInfo.isGameEnded && !quarterInfo.isQuarterEnded))
    ) {
        // Add latest quarter duration
        props.gameDataRef.current.quarterDurations = [
            ...props.gameDataRef.current.quarterDurations,
            timer.time - quarterInfo.mostRecentStart,
        ];

        // Add duration on pitch of current quarter for each player
        props.gameDataRef.current.players = playersInfo.map((player) => {
            // attempt to find the player object in the gameDataRef
            const refPlayer = props.gameDataRef.current.players.find(
                (refPlayer) => refPlayer.playerNumber === player.playerNumber
            );

            // calculate the quarter time for the player,
            // checking whether they are on the pitch or the bench
            const quarterTime =
                player.formationIdx === -1
                    ? player.previousTotalPitchTime -
                      player.totalTimeOfAllPreviousQuarters
                    : player.previousTotalPitchTime +
                      timer.time -
                      player.mostRecentSwitch -
                      player.totalTimeOfAllPreviousQuarters;

            // add new time to timesOnPitch array
            return {
                playerNumber: player.playerNumber,
                surname: player.surname,
                firstName: player.firstName,
                // determine whether the refPlayer exists before assigning
                timesOnPitch: refPlayer
                    ? [...refPlayer.timesOnPitch, quarterTime]
                    : [quarterTime],
            };
        });
    }

    // Force end game
    useEffect(() => {
        if (quarterInfo.isGameEnded) {
            props.onPageChange("summary");
        }
    }, [quarterInfo.isGameEnded]);

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

    // reset the gameDataRef at the start of each new game
    const resetRefHandler = () => {
        props.gameDataRef.current = { quarterDurations: [], players: [] };
    };

    const pitchPlayers = playersInfo.filter(
        (player) => player.formationIdx !== -1
    );
    return (
        <View style={styles.gameScreen}>
            <ControlBar
                quarterInfo={quarterInfo}
                dispatchQuarterInfo={dispatchQuarterInfo}
                dispatchPlayersInfo={dispatchPlayersInfo}
                timer={timer}
                onRefReset={resetRefHandler}
            />
            <Pitch
                onPitchPlayerPress={pitchPlayerPressHandler}
                highlightedPlayer={highlightedPlayer}
                players={pitchPlayers}
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
