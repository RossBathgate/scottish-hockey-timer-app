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

    const addPlayerHandler = (player) => {
        if (playersInfo.find((p) => p.playerNumber === player.playerNumber)) {
            formErrorHandler("Player numbers must be unique.");
        } else {
            setPlayersInfo((prevPlayers) => [player, ...prevPlayers]);
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
            <Header
                title="LOAD PLAYER DATA ###STILL NEED TO STYLE HEADER AND TEXT###
                    NOTE: ALSO NEED TO VALIDATE TO ENSURE PLAYER NUMBERS ARE
                    UNIQUE. ALSO NOTE: THE INFORMATION ADDED HERE IS JUST STORED
                    IN STATE.... IN THIS COMPONENT!"
            />
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
                    onBackPress={() => changePage("home")}
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
