import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import KeyboardDismissHO from "./components/HO/KeyboardDismissHO";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayerDataScreen from "./screens/PlayerDataScreen";
import SummaryScreen from "./screens/SummaryScreen";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");
    // used to compile data for export
    const gameDataRef = useRef({
        quarterDurations: [],
        players: [],
    });
    // used to store data of players in the game
    const playersDataRef = useRef([]);
    console.log(playersDataRef.current);

    const pageChangeHandler = (newPage) => {
        setCurrentPage(newPage);
    };

    // Determine which page to display
    let content;
    if (currentPage === "home") {
        content = (
            <HomeScreen
                onPageChange={pageChangeHandler}
                errorText={
                    playersDataRef.current.filter((p) => p.position !== "Bench")
                        .length >= 1
                        ? ""
                        : "At least 11 players on the pitch are required. NOTE!! TEMPORARILY SET TO 1 FOR DEV PURPOSES.  CHANGE THIS BACK FOR PRODUCITON."
                }
            />
        );
    } else if (currentPage === "game") {
        content = (
            <GameScreen
                onPageChange={pageChangeHandler}
                gameDataRef={gameDataRef}
            />
        );
    } else if (currentPage === "playerData") {
        content = (
            <PlayerDataScreen
                onPageChange={pageChangeHandler}
                playersDataRef={playersDataRef}
            />
        );
    } else if (currentPage === "summary") {
        content = (
            <SummaryScreen
                onPageChange={pageChangeHandler}
                gameDataRef={gameDataRef}
            />
        );
    }

    return (
        <KeyboardDismissHO>
            <View style={styles.container}>
                <StatusBar style="auto" />
                {content}
            </View>
        </KeyboardDismissHO>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
