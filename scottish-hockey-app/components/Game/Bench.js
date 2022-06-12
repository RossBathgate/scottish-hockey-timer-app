import React from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import sizes from "../../constants/sizes";
import Player from "./Player";
import colors from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";

const Bench = (props) => {
    return (
        <View style={styles.bench}>
            <ScrollView horizontal={true}>
                <TouchableWithoutFeedback>
                    <View style={styles.playersContainer}>
                        {props.players && props.players.length > 0 ? (
                            props.players.map((player) => {
                                const playerPressHandler = () => {
                                    props.onBenchPlayerPress(
                                        player.playerNumber
                                    );
                                };

                                const bTime =
                                    props.timer.time - player.mostRecentSwitch;
                                const fullTime = player.previousTotalPitchTime;
                                const quarterTime =
                                    fullTime -
                                    player.totalTimeOfAllPreviousQuarters;
                                return (
                                    <View
                                        key={player.playerNumber}
                                        style={styles.playerContainer}
                                    >
                                        <Player
                                            style={{
                                                borderColor:
                                                    props.isPitchPlayerHighlighted
                                                        ? colors.benchPlayerHighlightBorderColor
                                                        : colors.playerBorderColor,
                                                backgroundColor:
                                                    props.isPitchPlayerHighlighted
                                                        ? colors.benchPlayerHighlightColor
                                                        : colors.playerBackgroundColor,
                                            }}
                                            onPitch={false}
                                            onPress={playerPressHandler}
                                            playerNumber={player.playerNumber}
                                            displayName={player.firstName}
                                            mostRecentSwitch={
                                                player.mostRecentSwitch
                                            }
                                            bTime={bTime}
                                            fullTime={fullTime}
                                            quarterTime={quarterTime}
                                        />
                                    </View>
                                );
                            })
                        ) : (
                            <Text style={{ color: colors.bench.accent }}>
                                No players are on the bench.
                            </Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <Text style={styles.title}>BENCH</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bench: {
        // height: "17%",
        // backgroundColor: "white",
        backgroundColor: colors.bench.background,
        marginTop: 5,
        borderRadius: 15,
        padding: 5,
        paddingHorizontal: 20,
        // borderTopColor: "black",
        // borderTopWidth: 2,
    },

    playersContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    playerContainer: {
        marginHorizontal: 10,
        width: sizes.playerWidth,
    },

    title: {
        color: colors.bench.accent,
        fontSize: fontSizes.benchTitle,
        textAlign: "right",
        fontWeight: "500",
    },
});

export default Bench;
