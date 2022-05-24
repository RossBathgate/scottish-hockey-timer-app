import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Menu from "../components/Home/Menu";

const HomeScreen = (props) => {
    return (
        <View style={styles.homeScreen}>
            <Image
                style={styles.stopwatchImage}
                source={require("../assets/stopwatchLogo.png")}
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
    stopwatchImage: { maxWidth: 700 },
});

export default HomeScreen;
