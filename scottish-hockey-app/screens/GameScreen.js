import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Bench from "../components/Game/Bench";
import ControlBar from "../components/Game/ControlBar";
import Pitch from "../components/Game/Pitch";

const GameScreen = (props) => {
    return (
        <View style={styles.gameScreen}>
            <ControlBar />
            <Pitch />
            <Bench />
        </View>
    );
};

const styles = StyleSheet.create({
    gameScreen: { flex: 1, flexDirection: "column" },
});

export default GameScreen;
