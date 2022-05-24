import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../components/UI/Header";
import FullGameTimes from "../components/Summary/FullGameTimes";

const SummaryScreen = (props) => {
    return (
        <View style={styles.summaryScreen}>
            <Header title="GAME SUMMARY" />
            <View style={styles.container}>
                <Text style={styles.title}>FULL GAME SUMMARY</Text>
                <FullGameTimes gameDataRef={props.gameDataRef} />
                <Text style={styles.title}>PLAYERS SUMMARY</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryScreen: { flex: 1 },
    container: {
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 60,
        width: "100%",
        paddingHorizontal: "5%",
        textAlign: "center",
        marginTop: 20,
    },
});

export default SummaryScreen;

const Time = (props) => {
    const minutesRaw = Math.floor(props.nrSeconds / 60).toString();
    let hours = Math.floor(minutesRaw / 60).toString();
    let minutes = (Math.floor(props.nrSeconds / 60) % 60).toString();
    let seconds = (props.nrSeconds % 60).toString();

    if (hours.length <= 1) {
        hours = "0" + hours;
    }

    if (minutes.length <= 1) {
        minutes = "0" + minutes;
    }

    if (seconds.length <= 1) {
        seconds = "0" + seconds;
    }
    return (
        <Text>
            {hours > 0 ? hours + " : " : ""} {minutes} : {seconds}
        </Text>
    );
};
