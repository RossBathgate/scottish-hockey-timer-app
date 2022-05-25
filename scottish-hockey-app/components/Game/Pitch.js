import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import PitchSVG from "./PitchBG.svg";
import formations from "../../constants/formations";
import Player from "./Player";
import sizes from "../../constants/sizes";

const getFormation = (playersData) => {
    // store the y values of the different "rows" of players on the pitch
    const yValues = {
        Goalie: 0.06,
        Fullback: 0.22,
        "Half Back": 0.38,
        Midfield: 0.54,
        Forward: 0.7,
    };

    // get the x coords for players on a row, depending on the number of players.
    const get_x_values = (nrPlayers) => {};

    // reverse the array to start with lowest formationIdx
    playersData.reverse();

    // group players together
    const sortedPlayersData = {
        Goalie: playersData
            .filter((p) => p.position === "Goalie")
            .map((pl) => pl.playerNumber),
        Fullback: playersData
            .filter((p) => p.position === "Fullback")
            .map((pl) => pl.playerNumber),
        "Half Back": playersData
            .filter((p) => p.position === "Half Back")
            .map((pl) => pl.playerNumber),
        Midfield: playersData
            .filter((p) => p.position === "Midfield")
            .map((pl) => pl.playerNumber),
        Forward: playersData
            .filter((p) => p.position === "Forward")
            .map((pl) => pl.playerNumber),
    };

    const nrOfEachPlayer = {
        Goalie: sortedPlayersData.Goalie.length,
        Fullback: sortedPlayersData.Fullback.length,
        "Half Back": sortedPlayersData["Half Back"].length,
        Midfield: sortedPlayersData.Midfield.length,
        Forward: sortedPlayersData.Forward.length,
    };

    // find index of p in sortedPlayersData[p.position]

    // goalie, forward, goalie, goalie
    const formation = {
        players: playersData.map((p) => {
            const x =
                (sortedPlayersData[p.position].indexOf(p.playerNumber) + 1) /
                (nrOfEachPlayer[p.position] + 1);
            return { x: x, y: yValues[p.position] };
        }),
    };

    // const formation = {
    //     players: playersData.map((p) => {
    //         const x =
    //         return { x: x, y: yValues[p.position] };
    //     }),
    // };

    return formation;
};

const Pitch = (props) => {
    const currentFormation = getFormation(props.players);
    const pitchWidth = Dimensions.get("window").width;
    const pitchHeight =
        (Dimensions.get("window").height * sizes.pitchHeightPercent) / 100;

    return (
        <View style={styles.container}>
            <View style={styles.playersContainer}>
                {currentFormation.players.map((playerPos, formationIdx) => {
                    const left =
                        playerPos.x * pitchWidth -
                        Math.round(sizes.playerWidth / 2);
                    const top =
                        playerPos.y * pitchHeight -
                        Math.round(sizes.playerHeight / 2);

                    const player = props.players.find(
                        (p) => p.formationIdx === formationIdx
                    );

                    const playerPressHandler = () => {
                        props.onPitchPlayerPress(player.playerNumber);
                    };

                    const pTime = props.timer.time - player.mostRecentSwitch;
                    const fullTime = player.previousTotalPitchTime + pTime;
                    const quarterTime =
                        fullTime - player.totalTimeOfAllPreviousQuarters;

                    return (
                        <View
                            key={player.playerNumber}
                            style={{
                                ...styles.playerContainer,
                                left: left,
                                top: top,
                            }}
                        >
                            <Player
                                isHighlighted={
                                    props.highlightedPlayer ===
                                    player.playerNumber
                                }
                                onPitch={true}
                                onPress={playerPressHandler}
                                playerNumber={player.playerNumber}
                                pTime={pTime}
                                fullTime={fullTime}
                                quarterTime={quarterTime}
                            />
                        </View>
                    );
                })}
            </View>
            <PitchSVG width="100%" height="100%" preserveAspectRatio="none" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        backgroundColor: "red",
        height: sizes.pitchHeightPercent + "%",
    },

    playersContainer: {
        position: "absolute",
        zIndex: 1,
        width: "100%",
        top: 0,
        bottom: 0,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    playerContainer: {
        position: "absolute",
        width: sizes.playerWidth,
        height: sizes.playerHeight,
    },
});

export default Pitch;
