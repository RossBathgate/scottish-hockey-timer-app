import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import PitchSVG from "./PitchBG.svg";
import formations from "../../constants/formations";
import Player from "./Player";
import PlaceholderPlayer from "./PlaceholderPlayer";
import sizes from "../../constants/sizes";
import colors from "../../constants/colors";

const Pitch = (props) => {
    const currentFormation = props.formation;
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

                    const playerPressHandler = (playerNumber, formationIdx) => {
                        props.onPitchPlayerPress(playerNumber, formationIdx);
                    };

                    const pTime = props.timer.time - player.mostRecentSwitch;
                    const fullTime = player.previousTotalPitchTime + pTime;
                    const quarterTime =
                        fullTime - player.totalTimeOfAllPreviousQuarters;

                    return (
                        <View
                            key={
                                player.playerNumber.toString() +
                                player.formationIdx.toString()
                            }
                            style={{
                                ...styles.playerContainer,
                                left: left,
                                top: top,
                            }}
                        >
                            {player.isInvisible ? (
                                <PlaceholderPlayer
                                    backgroundColor={
                                        props.highlightedPlayer ===
                                        player.playerNumber
                                            ? colors.playerHighlightColor
                                            : props.highlightedPlayer !== null
                                            ? colors.playerPitchHighlightColor
                                            : colors.placeholderPlayerBackgroundColor
                                    }
                                    borderColor={
                                        colors.placeholderPlayerBorderColor
                                    }
                                    onPitch={true}
                                    onPress={playerPressHandler}
                                    formationIdx={player.formationIdx}
                                />
                            ) : (
                                <Player
                                    backgroundColor={
                                        props.highlightedPlayer ===
                                        player.playerNumber
                                            ? colors.playerHighlightColor
                                            : props.highlightedPlayer !== null
                                            ? colors.playerPitchHighlightColor
                                            : colors.playerBackgroundColor
                                    }
                                    borderColor={
                                        props.highlightedPlayer ===
                                        player.playerNumber
                                            ? colors.playerHighlightBorderColor
                                            : props.highlightedPlayer !== null
                                            ? colors.playerPitchHighlightBorderColor
                                            : colors.playerBorderColor
                                    }
                                    onPitch={true}
                                    onPress={playerPressHandler}
                                    playerNumber={player.playerNumber}
                                    formationIdx={player.formationIdx}
                                    displayName={player.firstName}
                                    pTime={pTime}
                                    fullTime={fullTime}
                                    quarterTime={quarterTime}
                                />
                            )}
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
