import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";

const PlayerSummary = ({ playerData, quarterDurations }) => {
    const incompleteTimePercentages = playerData.timesOnPitch.map(
        (pitchTime, i) => {
            if (i < quarterDurations.length) {
                // (extra check to avoid crashes)
                return Math.round((pitchTime / quarterDurations[i]) * 100);
            } else {
                return 0;
            }
        }
    );

    // Fill empty quarters with zeros
    const nrZeros = 4 - incompleteTimePercentages.length; // (extra check to avoid crashes)
    const allTimePercentages =
        nrZeros > 0
            ? [...incompleteTimePercentages, ...new Array(nrZeros).fill(0)]
            : incompleteTimePercentages;

    return (
        <View style={styles.playerSummary} key={playerData.playerNumber}>
            <View style={styles.personalInfo}>
                <Text style={styles.personalInfoText}>
                    {playerData.surname}, {playerData.firstName.substring(0, 1)}
                </Text>
                {/* <Text style={styles.personalInfoText}>
                    #{playerData.playerNumber}
                </Text> */}
            </View>
            <View style={styles.timeline}>
                {[1, 2, 3, 4].map((quarter) => (
                    <View key={quarter} style={styles.quarterContainer}>
                        <View
                            style={{
                                ...styles.quarterContent,
                                width: allTimePercentages[quarter - 1] + "%",
                            }}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default PlayerSummary;

const styles = StyleSheet.create({
    playerSummary: {
        width: "100%",
        marginBottom: 20,
    },
    personalInfo: {
        flexDirection: "row",
        marginBottom: 5,
    },
    personalInfoText: {
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 5,
    },
    timeline: {
        backgroundColor: "gray",
        height: 20,
        borderRadius: 10,
        flexDirection: "row",
    },
    quarterContainer: {
        position: "relative",
        flex: 1,
    },
    quarterContent: {
        backgroundColor: colors.summaryScreen.playerOnPitch, //"red",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        borderRadius: 10,
    },
});
