import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import PlayerDataForm from "../components/PlayerData/PlayerDataForm";
import Header from "../components/UI/Header";
import Button from "../components/UI/Button";
import ImportIconSVG from "../assets/exportIcon.svg";
import colors from "../constants/colors";
import sizes from "../constants/sizes";
import fontSizes from "../constants/fontSizes";
import AddedPlayers from "../components/PlayerData/AddedPlayers";

// generate a list of {x: __, y: __} objects representing the locations
// of each player on the PITCH.
const getFormation = (data) => {
    //create deep copy to avoid side effects
    const playersData = [...data];

    // store the y values of the different "rows" of players on the pitch
    const yValues = {
        Goalie: 0.06,
        Fullback: 0.245,
        "Half Back": 0.43,
        Midfield: 0.615,
        Forward: 0.8,
    };

    // start with lowest formationIdx
    playersData.reverse();

    // group players together and get a list of corresponding player numbers
    const sortedPlayersData = {
        Goalie: playersData
            .filter((p) => p.position === "Goalie")
            .map((pl) => pl.playerNumber),
        Fullback: playersData
            .filter((p) => p.position === "Fullback")
            .map((pl) => pl.playerNumber),
        "Half Back": playersData
            .filter((p) => p.position === "Half Back")
            .map((pl) => pl.playerNumber),
        Midfield: playersData
            .filter((p) => p.position === "Midfield")
            .map((pl) => pl.playerNumber),
        Forward: playersData
            .filter((p) => p.position === "Forward")
            .map((pl) => pl.playerNumber),
    };

    const nrOfEachPlayer = {
        Goalie: sortedPlayersData.Goalie.length,
        Fullback: sortedPlayersData.Fullback.length,
        "Half Back": sortedPlayersData["Half Back"].length,
        Midfield: sortedPlayersData.Midfield.length,
        Forward: sortedPlayersData.Forward.length,
    };

    // find index of p in sortedPlayersData[p.position]

    // goalie, forward, goalie, goalie
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
    const [playersInfo, setPlayersInfo] = useState([]);
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
            <ScrollView style={styles.scrollContainer}>
                <TouchableWithoutFeedback>
                    <View>
                        <View
                            style={{
                                ...styles.buttonsContainer,
                                width: "100%",
                                justifyContent: "flex-start",
                            }}
                        >
                            {/* <Button
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
                    textStyle={{ fontSize: fontSizes.formButton }}
                /> */}
                        </View>
                        <Text style={styles.title}>ADD NEW PLAYER</Text>
                        <PlayerDataForm
                            onBackPress={() => {
                                setPlayersDataRef(playersInfo);
                                setFormation(
                                    getFormation(
                                        playersInfo.filter(
                                            (p) => p.formationIdx !== -1
                                        )
                                    )
                                );
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
