import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");

    const pageChangeHandler = (newPage) => {
        setCurrentPage(newPage);
    };

    // Determine which page to display
    let content;
    if (currentPage === "home") {
        content = <HomeScreen onPageChange={pageChangeHandler} />;
    } else if (currentPage === "game") {
        content = <GameScreen onPageChange={pageChangeHandler} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
