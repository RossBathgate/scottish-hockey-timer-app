import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "../UI/Card";
import Button from "../UI/Button";
import TimerDisplay from "./TimerDisplay/TimerDisplay";

const ControlBar = (props) => {
    return (
        <View style={styles.controlBar}>
            <Card style={styles.card}>
                <Button icon="" onPress={() => {}} title="||" />
                <Button icon="" onPress={() => {}} title=">" />
            </Card>
            <Card style={styles.card}>
                <Button icon="" onPress={() => {}} title="END QUARTER" />
            </Card>
            <Card style={styles.card}>
                <TimerDisplay style={styles.timer} timerType="quarter" />
                <TimerDisplay style={styles.timer} timerType="fullGame" />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        height: "100%",
    },
    timer: {
        minWidth: 65,
        marginHorizontal: 10,
    },
    controlBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
        height: "4%",
        backgroundColor: "white",
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
});

export default ControlBar;
