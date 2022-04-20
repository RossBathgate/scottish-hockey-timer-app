import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Player from "./components/Game/Player";

const RossTest = (props) => {
    const playerPressHandler = (playerNumber) => {
        console.log("Player number " + playerNumber + " was pressed");
    };
    return (
        <View style={styles.screen}>
            <Text>Test</Text>
            <Player onPlayerPress={playerPressHandler} playerNumber={1} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, paddingVertical: 50 },
});

export default RossTest;
