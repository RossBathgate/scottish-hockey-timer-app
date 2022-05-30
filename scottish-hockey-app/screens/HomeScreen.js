import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Menu from "../components/Home/Menu";
import StopwatchSVG from "../assets/stopwatchLogo.svg";

const HomeScreen = (props) => {
    return (
        <View style={styles.homeScreen}>
            {/* <StopwatchSVG /> */}
            <Image
                style={styles.stopwatchImage}
                source={require("../assets/stopwatchLogo2.png")}
            />
            <Menu
                onPageChange={props.onPageChange}
                errorText={props.errorText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    homeScreen: { flex: 1, justifyContent: "space-between" },
    stopwatchImage: { maxWidth: 700, top: -130, left: -100 },
});

export default HomeScreen;
