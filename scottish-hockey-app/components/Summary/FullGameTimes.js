import React from "react";
import { View, StyleSheet, Text } from "react-native";

const FullGameTimes = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>TOTAL ELAPSED TIME</Text>
                <Text style={styles.titleText}>QUARTER 1</Text>
                <Text style={styles.titleText}>QUARTER 2</Text>
                <Text style={styles.titleText}>QUARTER 3</Text>
                <Text style={styles.titleText}>QUARTER 4</Text>
            </View>
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

                {/* ERRORS:
                1. THERE IS AN EXTRA TIME SOMEHOW
                2. NEED TO CHECK WHEN ONLY, E.G., 2 QUARTERS HAVE BEEN PLAYED AND NOT ALL 4 */}
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
