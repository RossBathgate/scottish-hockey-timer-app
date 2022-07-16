import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import PlayerDataForm from "../components/PlayerData/PlayerDataForm";
import colors from "../constants/colors";
import fontSizes from "../constants/fontSizes";
import AddedPlayers from "../components/PlayerData/AddedPlayers";
import importPlayerData from "../scripts/importPlayerData";
import savePlayerData from "../scripts/savePlayerData";

// generate a list of {x: __, y: __} objects representing the locations
// of each player on the PITCH.
const getFormation = (data) => {
    //create deep copy to avoid side effects
    const playersData = [...data];

    // store the y values of the different "rows" of players on the pitch
    const yValues = {
        Forward: 0.13,
        Midfield: 0.315,
        "Half Back": 0.5,
        Fullback: 0.685,
        Goalie: 0.87,
    };

    // start with lowest formationIdx
    playersData.reverse();

    // group players together and get a list of corresponding player numbers
    const sortedPlayersData = {
        Goalie: playersData
            .filter((p) => p.position === "Goalie" && p.isInvisible === false)
            .map((pl) => pl.playerNumber),
        Fullback: playersData
            .filter((p) => p.position === "Fullback" && p.isInvisible === false)
            .map((pl) => pl.playerNumber),
        "Half Back": playersData
            .filter(
                (p) => p.position === "Half Back" && p.isInvisible === false
            )
            .map((pl) => pl.playerNumber),
        Midfield: playersData
            .filter((p) => p.position === "Midfield" && p.isInvisible === false)
            .map((pl) => pl.playerNumber),
        Forward: playersData
            .filter((p) => p.position === "Forward" && p.isInvisible === false)
            .map((pl) => pl.playerNumber),
    };

    const nrOfEachPlayer = {
        Goalie: sortedPlayersData.Goalie.length,
        Fullback: sortedPlayersData.Fullback.length,
        "Half Back": sortedPlayersData["Half Back"].length,
        Midfield: sortedPlayersData.Midfield.length,
        Forward: sortedPlayersData.Forward.length,
    };

    const formation = {
        players: playersData.map((p) => {
            const x =
                (sortedPlayersData[p.position].indexOf(p.playerNumber) + 1) /
                (nrOfEachPlayer[p.position] + 1);
            return { x: x, y: yValues[p.position] };
        }),
    };

    return formation;
};

const PlayerDataScreen = (props) => {
    const [playersInfo, setPlayersInfo] = useState(
        props.playersDataRef.current
    );
    const [error, setError] = useState({ isError: false, msg: "" });

    const changePage = (newPage) => {
        props.onPageChange(newPage);
    };

    const setPlayersDataRef = (playersToSet) => {
        props.playersDataRef.current = playersToSet;
    };

    const setFormation = (newFormation) => {
        props.formationRef.current = newFormation;
    };

    const addPlayerHandler = (player) => {
        if (playersInfo.find((p) => p.playerNumber === player.playerNumber)) {
            formErrorHandler("Player numbers must be unique.");
        } else {
            // generate a new player number
            const newPlayerNumber = player.playerNumber
                ? player.playerNumber
                : playersInfo.length === 0
                ? 0
                : Math.max(...playersInfo.map((p) => p.playerNumber)) + 1;

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
                            : largestPreviousFormationIdx + 1
                        : 0;

                const newPlayer = {
                    ...player,
                    formationIdx: newFormationIdx,
                    playerNumber: newPlayerNumber,
                    mostRecentSwitch: 0,
                    previousTotalPitchTime: 0,
                    previousQuarterPitchTime: 0,
                    totalTimeOfAllPreviousQuarters: 0,
                    isInvisible: false,
                };

                // used for replacing carded players on the pitch
                const newInvisiblePlayer = {
                    ...newPlayer,
                    isInvisible: true,
                };
                return [newPlayer, newInvisiblePlayer, ...prevPlayers];
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

    const importPlayerDataHandler = async () => {
        const data = await importPlayerData();
        if (data.players) {
            data.players.forEach((p) => addPlayerHandler(p));
        }
    };

    const savePlayerDataHandler = () => {
        const data = {
            players: playersInfo
                .filter((p) => p.isInvisible === false)
                .map((p) => {
                    return {
                        firstName: p.firstName,
                        surname: p.surname,
                        playerNumber: p.playerNumber,
                        position: p.position,
                    };
                }),
        };

        savePlayerData(data);
    };

    // import data on page load
    useEffect(() => {
        if (!props.isDataImportedRef.current) {
            importPlayerDataHandler();
            props.isDataImportedRef.current = true;
        }
    }, []);

    return (
        <View style={styles.playerDataScreen}>
            <ScrollView style={styles.scrollContainer}>
                <TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.title}>ADD NEW PLAYER</Text>
                        <PlayerDataForm
                            onBackPress={() => {
                                setPlayersDataRef(playersInfo);
                                setFormation(
                                    getFormation(
                                        playersInfo.filter(
                                            (p) =>
                                                p.formationIdx !== -1 &&
                                                p.isInvisible === false
                                        )
                                    )
                                );
                                savePlayerDataHandler();
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
                                    players={playersInfo.filter(
                                        (p) => p.isInvisible === false
                                    )}
                                    onRemovePlayer={removePlayerHandler}
                                />
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>
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
        fontSize: fontSizes.formHeading,
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
    importSaveContainer: {
        justifyContent: "flex-start",
        width: "100%",
    },
    importSaveBtn: {
        width: "20%",
        padding: 20,
        backgroundColor: colors.buttonBackgrounds.grey,
        marginLeft: 0,
        marginRight: 30,
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
        flexGrow: 1,
    },
    errorText: {
        color: "white",
        backgroundColor: "#FF6262",
        textAlign: "center",
        fontSize: fontSizes.errorText,
        marginVertical: 10,
        padding: 5,
        borderRadius: 5,
    },
});

export default PlayerDataScreen;
