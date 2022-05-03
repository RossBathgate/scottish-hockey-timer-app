import React from "react";
import { View, StyleSheet, Text } from "react-native";
import sizes from "../../constants/sizes";
import Player from "./Player";

const Bench = (props) => {
    return (
        <View style={styles.bench}>
            {[1, 2, 3, 4, 5].map((elem) => (
                <View style={styles.playerContainer}>
                    <Player playerNumber={elem} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bench: {
        height: "17%",
        backgroundColor: "white",
        borderTopColor: "black",
        borderTopWidth: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    playerContainer: {
        marginHorizontal: 10,
        width: sizes.playerWidth
    }
});

export default Bench;
