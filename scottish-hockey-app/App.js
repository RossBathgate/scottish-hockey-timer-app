import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import KeyboardDismissHO from "./components/HO/KeyboardDismissHO";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayerDataScreen from "./screens/PlayerDataScreen";
import SummaryScreen from "./screens/SummaryScreen";
import Header from "./components/UI/Header";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");

    // used to compile data for export
    const gameDataRef = useRef({
        quarterDurations: [],
        players: [],
    });

    // used to store data of players in the game
    const playersDataRef = useRef([]);

    // store the current formation
    const formationRef = useRef([]);

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
                        : "At least 1 player on the pitch is required to start."
                }
            />
        );
    } else if (currentPage === "game") {
        content = (
            <GameScreen
                onPageChange={pageChangeHandler}
                gameDataRef={gameDataRef}
                playersDataRef={playersDataRef}
                formation={formationRef.current}
            />
        );
    } else if (currentPage === "playerData") {
        content = (
            <PlayerDataScreen
                onPageChange={pageChangeHandler}
                playersDataRef={playersDataRef}
                formationRef={formationRef}
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

    const displayPageNames = {
        playerData: "LOAD PLAYER DATA",
        summary: "GAME SUMMARY",
    };

    return (
        <KeyboardDismissHO>
            <View style={styles.container}>
                <StatusBar style="auto" />
                {currentPage !== "game" && currentPage !== "home" && (
                    <Header title={displayPageNames[currentPage]} />
                )}
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
