import React from "react";
import { View, StyleSheet, Text } from "react-native";
import sizes from "../../constants/sizes";
import Player from "./Player";
import colors from "../../constants/colors";

const Bench = (props) => {
    return (
        <View style={styles.bench}>
            <View style={styles.playersContainer}>
                {props.players.map((player) => (
                    <View style={styles.playerContainer}>
                        <Player playerNumber={player.playerNumber} />
                    </View>
                ))}
            </View>
            <Text style={styles.title}>BENCH</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bench: {
        // height: "17%",
        // backgroundColor: "white",
        backgroundColor: colors.bench.background,
        marginTop: 10,
        borderRadius: 15,
        padding: 15,
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
        fontSize: 30,
        textAlign: "right",
        fontWeight: "500",
    },
});

export default Bench;
