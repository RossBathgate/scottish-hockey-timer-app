import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import PlayerDataForm from "../components/PlayerData/PlayerDataForm";
import Header from "../components/UI/Header";
import Button from "../components/UI/Button";
import ImportIconSVG from "../assets/exportIcon.svg";
import colors from "../constants/colors";
import sizes from "../constants/sizes";
import AddedPlayers from "../components/PlayerData/AddedPlayers";

const PlayerDataScreen = (props) => {
    const [playersInfo, setPlayersInfo] = useState([]);
    const [error, setError] = useState({ isError: false, msg: "" });

    const changePage = (newPage) => {
        props.onPageChange(newPage);
    };

    const setPlayersDataRef = (playersToSet) => {
        props.playersDataRef.current = playersToSet;
    };

    const addPlayerHandler = (player) => {
        if (playersInfo.find((p) => p.playerNumber === player.playerNumber)) {
            formErrorHandler("Player numbers must be unique.");
        } else {
            setPlayersInfo((prevPlayers) => {
                // find the largest formation index of all players.  (Use -1 below to avoid math.max() of empty list, which is -Infinity).
                const largestPreviousFormationIdx = Math.max(
                    -1,
                    ...prevPlayers.map((player) => player.formationIdx)
                );

                const newFormationIdx =
                    player.position === "Bench"
                        ? -1
                        : prevPlayers.length > 0
                        ? largestPreviousFormationIdx === -1
                            ? 0
                            : largestPreviousFormationIdx + 1 //prevPlayers[0].formationIdx + 1
                        : 0;

                const newPlayer = {
                    ...player,
                    formationIdx: newFormationIdx,
                    mostRecentSwitch: 0,
                    previousTotalPitchTime: 0,
                    previousQuarterPitchTime: 0,
                    totalTimeOfAllPreviousQuarters: 0,
                };
                return [newPlayer, ...prevPlayers];
            });
        }
    };

    const removePlayerHandler = (playerNumber) => {
        setPlayersInfo((prevPlayers) =>
            prevPlayers.filter((player) => player.playerNumber !== playerNumber)
        );
    };

    const formErrorHandler = (error) => {
        setError({ isError: true, msg: error });
    };

    const formClearErrorHandler = () => {
        setError({ isError: false, msg: "" });
    };

    return (
        <View style={styles.playerDataScreen}>
            <Header title="LOAD PLAYER DATA" />
            <View
                style={{
                    ...styles.buttonsContainer,
                    width: "100%",
                    justifyContent: "flex-start",
                }}
            >
                <Button
                    onPress={() => {}}
                    icon={
                        <ImportIconSVG
                            width={sizes.menuButtonSizes}
                            height={sizes.menuButtonSizes}
                        />
                    }
                    title="IMPORT"
                    style={{
                        ...styles.button,
                        backgroundColor: colors.buttonBackgrounds.darkGreen,
                    }}
                />
            </View>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.title}>ADD NEW PLAYER</Text>
                <PlayerDataForm
                    onBackPress={() => {
                        setPlayersDataRef(playersInfo);
                        changePage("home");
                    }}
                    onAddPlayer={addPlayerHandler}
                    onError={formErrorHandler}
                    onClearError={formClearErrorHandler}
                />
                {error.isError && (
                    <Text style={styles.errorText}>{error.msg}</Text>
                )}
                {playersInfo.length > 0 && (
                    <>
                        <Text style={styles.title}>ADDED PLAYERS</Text>
                        <AddedPlayers
                            players={playersInfo}
                            onRemovePlayer={removePlayerHandler}
                        />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    playerDataScreen: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "black",
        fontSize: 60,
        textAlign: "left",
        marginTop: 20,
        marginBottom: 10,
    },
    buttonsContainer: {
        width: "95%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginVertical: 7,
        marginLeft: 30,
        width: "40%",
        borderRadius: 5,
        backgroundColor: colors.buttonBackgrounds.grey,
    },
    scrollContainer: {
        width: "95%",
    },
    errorText: {
        color: "white",
        backgroundColor: "#FF6262",
        textAlign: "center",
        fontSize: 20,
        marginVertical: 10,
        padding: 5,
        borderRadius: 5,
    },
});

export default PlayerDataScreen;
