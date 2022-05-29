import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import PitchSVG from "./PitchBG.svg";
import formations from "../../constants/formations";
import Player from "./Player";
import sizes from "../../constants/sizes";

const Pitch = (props) => {
    const currentFormation = props.formation; //getFormation(props.players);
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
        height: sizes.pitchHeightPercent + "%",
    },

    playersContainer: {
        position: "absolute",
        zIndex: 1,
        width: "100%",
        top: 22,
        bottom: 22,
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
