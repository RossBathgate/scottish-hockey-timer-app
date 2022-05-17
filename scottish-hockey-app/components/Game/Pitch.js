import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import PitchSVG from "./PitchBG.svg";
import formations from "../../constants/formations";
import Player from "./Player";
import sizes from "../../constants/sizes";

const Pitch = (props) => {
    const currentFormation = formations.formation0; // TBC
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

                    return (
                        <View
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
                                onPress={playerPressHandler}
                                playerNumber={player.playerNumber}
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
