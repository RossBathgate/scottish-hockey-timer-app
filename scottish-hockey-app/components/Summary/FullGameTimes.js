import React from "react";
import { View, StyleSheet, Text } from "react-native";

const FullGameTimes = (props) => {
    return (
        <View style={styles.container}>
            {/* Display the correct headings for total elapsed time, and the quarters which were played*/}
            <View>
                <Text style={styles.titleText}>TOTAL ELAPSED TIME</Text>
                {props.gameDataRef.current.quarterDurations.map((q, idx) => (
                    <Text key={idx} style={styles.titleText}>
                        QUARTER {idx + 1}
                    </Text>
                ))}
            </View>

            {/* Display the formatted times, corresponding to the headings on the left column */}
            <View>
                <Text style={styles.timerText}>
                    <Time
                        nrSeconds={props.gameDataRef.current.quarterDurations.reduce(
                            (partial, x) => partial + x,
                            0
                        )}
                    />
                </Text>
                {props.gameDataRef.current.quarterDurations.map(
                    (quarterTime, index) => (
                        <Text key={index} style={styles.timerText}>
                            <Time nrSeconds={quarterTime} />
                        </Text>
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "5%",
        width: "100%",
    },
    titleText: { fontSize: 30 },
    timerText: { fontSize: 30 },
});

export default FullGameTimes;

// Takes nrSeconds and formats into (...hh:)mm:ss
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
