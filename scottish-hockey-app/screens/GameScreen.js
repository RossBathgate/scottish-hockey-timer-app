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

    const [playersInfo, setPlayersInfo] = useState([
        { formationIdx: 0, playerNumber: 0 },
        { formationIdx: 1, playerNumber: 1 },
        { formationIdx: -1, playerNumber: 2 },
        { formationIdx: 2, playerNumber: 3 },
    ]);

    const [highlightedPlayer, setHighlightedPlayer] = useState(null);

    const pitchPlayerPressHandler = (playerNumber) => {
        setHighlightedPlayer((prevNumber) =>
            prevNumber !== playerNumber ? playerNumber : null
        );
    };

    const benchPlayerPressHandler = (benchPlayerNumber) => {
        if (highlightedPlayer !== null) {
            // find formationIdx of highlighted player
            const highlightedFormationIdx = playersInfo.find(
                (player) => player.playerNumber === highlightedPlayer
            ).formationIdx;

            // set benchPlayer formationIdx to that of the highlighted player
            // and set the formationIdx of the highlighted player to -1
            setPlayersInfo((currentPlayersInfo) =>
                currentPlayersInfo.map((player) => {
                    player;
                    if (player.playerNumber === benchPlayerNumber) {
                        player.formationIdx = highlightedFormationIdx;
                    } else if (player.playerNumber === highlightedPlayer) {
                        player.formationIdx = -1;
                    }
                    return player;
                })
            );
        }
    };

    return (
        <View style={styles.gameScreen}>
            <ControlBar
                quarterInfo={quarterInfo}
                dispatchQuarterInfo={dispatchQuarterInfo}
                timer={timer}
            />
            <Pitch
                onPitchPlayerPress={pitchPlayerPressHandler}
                highlightedPlayer={highlightedPlayer}
                players={playersInfo.filter(
                    (player) => player.formationIdx !== -1
                )}
            />
            <Bench
                onBenchPlayerPress={benchPlayerPressHandler}
                players={playersInfo.filter(
                    (player) => player.formationIdx === -1
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreen: { flex: 1, flexDirection: "column" },
});

export default GameScreen;
