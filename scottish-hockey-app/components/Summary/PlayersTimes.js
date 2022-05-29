import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PlayerSummary from "./PlayerSummary";

const PlayersTimes = (props) => {
    const { players: playersData, quarterDurations } =
        props.gameDataRef.current;

    return (
        <View style={styles.playersList}>
            {playersData.map((playerData) => (
                <PlayerSummary
                    key={playerData.playerNumber}
                    playerData={playerData}
                    quarterDurations={quarterDurations}
                />
            ))}
        </View>
    );
};

export default PlayersTimes;

const styles = StyleSheet.create({
    playersList: {
        width: "100%",
        padding: "5%",
    },
});
