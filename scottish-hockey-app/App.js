import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Modal from "./components/UI/Modal";
import KeyboardDismissHO from "./components/HO/KeyboardDismissHO";
import GameScreen from "./screens/GameScreen";
import HomeScreen from "./screens/HomeScreen";
import PlayerDataScreen from "./screens/PlayerDataScreen";
import SummaryScreen from "./screens/SummaryScreen";
import Header from "./components/UI/Header";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [modalData, setModalData] = useState(null);

    // used to compile data for export
    const gameDataRef = useRef({
        quarterDurations: [],
        players: [],
    });

    // used to store data of players in the game
    const playersDataRef = useRef([]);

    // store the current formation
    const formationRef = useRef([]);

    // used to stop data imports every time the load player data screen is rendered
    const isDataImportedRef = useRef(false);

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
                isDataImportedRef={isDataImportedRef}
            />
        );
    } else if (currentPage === "summary") {
        content = (
            <SummaryScreen
                onPageChange={pageChangeHandler}
                gameDataRef={gameDataRef}
                onSetModalData={setModalData}
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
                {modalData !== null && <Modal {...modalData} />}
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
