import React, { useState, useRef, useReducer, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar/ControlBar";
import Pitch from "../components/Game/Pitch";
import useTimer from "../hooks/use-timer";

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

        case "swap_bench":
            const allowedInvisPitchPlayers = stateCopy.filter((player) => {
                const actualPlayer = stateCopy.find(
                    (p) =>
                        p.playerNumber === player.playerNumber && !p.isInvisible
                );

                return (
                    actualPlayer.formationIdx === -1 &&
                    player.isInvisible &&
                    player.formationIdx !== -1
                );
            });

            const attemptedInvisiblePlayer = allowedInvisPitchPlayers.find(
                (p) =>
                    p.playerNumber ===
                    action.playerNumbers.highlightedPlayerNumber
            );

            const pitchPlayer = attemptedInvisiblePlayer
                ? attemptedInvisiblePlayer
                : stateCopy.find(
                      (p) =>
                          p.playerNumber ===
                          action.playerNumbers.highlightedPlayerNumber
                  );

            const benchPlayer = stateCopy.find(
                (p) =>
                    p.playerNumber === action.playerNumbers.benchPlayerNumber &&
                    !p.isInvisible
            );

            const pitchPlayerFormationIdx = pitchPlayer.formationIdx;
            const pitchPlayerPosition = pitchPlayer.position;

            // update bench player's properties so they are now on the pitch
            benchPlayer.formationIdx = pitchPlayerFormationIdx;
            benchPlayer.position = pitchPlayerPosition;
            benchPlayer.mostRecentSwitch = action.time;

            // update pitch player's properties so they are now on the bench
            pitchPlayer.formationIdx = -1;
            pitchPlayer.position = "Bench";
            const pTime = action.time - pitchPlayer.mostRecentSwitch;
            pitchPlayer.previousTotalPitchTime =
                pitchPlayer.previousTotalPitchTime + pTime;
            pitchPlayer.mostRecentSwitch = action.time;

            return stateCopy;

        case "swap_pitch":
            const highlightedPitchPlayer = action.isHighlightedPlayerInvisible
                ? stateCopy.find(
                      (p) =>
                          p.playerNumber ===
                              action.playerNumbers.highlightedPlayerNumber &&
                          p.isInvisible
                  )
                : stateCopy.find(
                      (p) =>
                          p.playerNumber ===
                              action.playerNumbers.highlightedPlayerNumber &&
                          !p.isInvisible
                  );

            const newPitchPlayer = action.isInvisible
                ? stateCopy.find(
                      (p) =>
                          p.playerNumber ===
                              action.playerNumbers.newPitchPlayerNumber &&
                          p.isInvisible
                  )
                : stateCopy.find(
                      (p) =>
                          p.playerNumber ===
                              action.playerNumbers.newPitchPlayerNumber &&
                          !p.isInvisible
                  );

            // swap players
            const tempFormationIdx = highlightedPitchPlayer.formationIdx;
            const tempPosition = highlightedPitchPlayer.position;
            highlightedPitchPlayer.formationIdx = newPitchPlayer.formationIdx;
            highlightedPitchPlayer.position = newPitchPlayer.position;
            newPitchPlayer.formationIdx = tempFormationIdx;
            newPitchPlayer.position = tempPosition;

            return stateCopy;

        case "card":
            const cardPlayer = stateCopy.find(
                (p) =>
                    p.playerNumber === action.highlightedPlayerNumber &&
                    !p.isInvisible
            );

            const invisiblePlayer = stateCopy.find(
                (p) =>
                    p.playerNumber === action.highlightedPlayerNumber &&
                    p.isInvisible
            );

            // update invisible player's properties so that they are correct
            invisiblePlayer.formationIdx = cardPlayer.formationIdx;
            invisiblePlayer.position = cardPlayer.position;
            invisiblePlayer.mostRecentSwitch = action.time;

            // update card player's properties so they are now on the bench
            cardPlayer.formationIdx = -1;
            cardPlayer.position = "Bench";
            const playerPTime = action.time - cardPlayer.mostRecentSwitch;
            cardPlayer.previousTotalPitchTime =
                cardPlayer.previousTotalPitchTime + playerPTime;
            cardPlayer.mostRecentSwitch = action.time;

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
    const [isHighlightedPlayerInvisible, setIsHighlightedPlayerInvisible] =
        useState(false);

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
        props.gameDataRef.current.players = playersInfo
            .filter((p) => !p.isInvisible)
            .map((player) => {
                // attempt to find the player object in the gameDataRef
                const refPlayer = props.gameDataRef.current.players.find(
                    (refPlayer) =>
                        refPlayer.playerNumber === player.playerNumber
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

    // Reset timers on page load
    useEffect(() => {
        dispatchPlayersInfo({ msg: "resetTimes" });
    }, []);

    const pitchPlayerPressHandler = (playerNumber) => {
        // determine if this player is an "invisible" player
        const isInvisible = playersInfo
            .filter(
                (player) =>
                    player.formationIdx === -1 && player.isInvisible === false
            )
            .map((p) => p.playerNumber)
            .includes(playerNumber);

        // determine if a swap to another pitch player is requested
        if (highlightedPlayer !== null) {
            dispatchPlayersInfo({
                msg: "swap_pitch",
                playerNumbers: {
                    newPitchPlayerNumber: playerNumber,
                    highlightedPlayerNumber: highlightedPlayer,
                },
                isInvisible: isInvisible,
                isHighlightedPlayerInvisible: isHighlightedPlayerInvisible,
            });
        }

        // toggle highlight on the chosen player
        setHighlightedPlayer((prevValue) => {
            if (prevValue === null) {
                setIsHighlightedPlayerInvisible(isInvisible);
                return playerNumber;
            } else {
                setIsHighlightedPlayerInvisible(false);
                return null;
            }
        });
    };

    const benchPlayerPressHandler = (benchPlayerNumber) => {
        if (highlightedPlayer !== null) {
            dispatchPlayersInfo({
                msg: "swap_bench",
                time: timer.time,
                playerNumbers: {
                    benchPlayerNumber: benchPlayerNumber,
                    highlightedPlayerNumber: highlightedPlayer,
                },
            });
        }

        setIsHighlightedPlayerInvisible(false);
        setHighlightedPlayer(null);
    };

    // used to send players to the bench without swapping for another player
    const cardPlayerBtnPressHandler = () => {
        if (highlightedPlayer !== null) {
            dispatchPlayersInfo({
                msg: "card",
                time: timer.time,
                highlightedPlayerNumber: highlightedPlayer,
            });
        }

        setIsHighlightedPlayerInvisible(false);
        setHighlightedPlayer(null);
    };

    // reset the gameDataRef at the start of each new game
    const resetRefHandler = () => {
        props.gameDataRef.current = { quarterDurations: [], players: [] };
    };

    const pitchPlayers = playersInfo.filter(
        (player) => player.formationIdx !== -1 && !player.isInvisible
    );

    const allowedInvisPitchPlayers = playersInfo.filter((player) => {
        const actualPlayer = playersInfo.find(
            (p) => p.playerNumber === player.playerNumber && !p.isInvisible
        );

        return (
            actualPlayer.formationIdx === -1 &&
            player.isInvisible &&
            player.formationIdx !== -1
        );
    });
    allowedInvisPitchPlayers.forEach((player) => {
        pitchPlayers.push(player);
    });

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
                formation={props.formation}
                timer={timer}
            />
            <Bench
                onCardPlayerBtnPress={cardPlayerBtnPressHandler}
                onBenchPlayerPress={benchPlayerPressHandler}
                players={playersInfo.filter(
                    (player) =>
                        player.formationIdx === -1 &&
                        player.isInvisible === false
                )}
                timer={timer}
                highlightedPlayer={highlightedPlayer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreen: { flex: 1, flexDirection: "column" },
});

export default GameScreen;
