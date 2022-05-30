import React from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
} from "react-native";
import Header from "../components/UI/Header";
import FullGameTimes from "../components/Summary/FullGameTimes";
import PlayersTimes from "../components/Summary/PlayersTimes";
import Button from "../components/UI/Button";
import colors from "../constants/colors";
import ExportIconSVG from "../assets/exportIcon.svg";
import BackIconSVG from "../assets/backIcon.svg";
import sizes from "../constants/sizes";
import fontSizes from "../constants/fontSizes";
import exportToSpreadsheet from "../scripts/exportToSpreadsheet";
import Modal from "../components/UI/Modal";

const SummaryScreen = (props) => {
    const changePage = (newPage) => {
        props.onPageChange(newPage);
    };

    const exportHandler = (gameDataRef) => {
        const getSpreadsheetTitle = () => {
            const date = new Date();
            const title =
                "GameExport_" +
                date.getFullYear() +
                "_" +
                date.getMonth() +
                "_" +
                date.getDate();

            return title;
        };

        const getData = (gameDataRef) => {
            const data = gameDataRef.current.players.map((p) => {
                return {
                    playerFirstName: p.firstName,
                    playerSurname: p.surname,
                    playerNumber: p.playerNumber,
                    quarter1Time:
                        p.timesOnPitch.length >= 1
                            ? p.timesOnPitch[0]
                            : "No Time Information",
                    quarter2Time:
                        p.timesOnPitch.length >= 2
                            ? p.timesOnPitch[1]
                            : "No Time Information",
                    quarter3Time:
                        p.timesOnPitch.length >= 3
                            ? p.timesOnPitch[2]
                            : "No Time Information",
                    quarter4Time:
                        p.timesOnPitch.length >= 4
                            ? p.timesOnPitch[3]
                            : "No Time Information",
                    totalTime: p.timesOnPitch.reduce(
                        (partial, x) => partial + x,
                        0
                    ),
                };
            });
            return data;
        };

        const title = getSpreadsheetTitle();
        const data = getData(gameDataRef);

        exportToSpreadsheet(title, data);
    };

    const modalBackHandler = () => {
        props.onSetModalData(null);
    };

    const modalOkHandler = () => {
        props.onSetModalData(null);
        changePage("home");
    };
    const mainMenuPressHandler = () => {
        props.onSetModalData({
            title: "Are you sure?",
            msg: "Any un-exported data will be lost",
            btnOneTitle: "Back",
            btnTwoTitle: "Ok",
            onBtnOnePress: modalBackHandler,
            onBtnTwoPress: modalOkHandler,
        });
    };

    return (
        <View style={styles.summaryScreen}>
            <ScrollView style={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback style={styles.container}>
                    <View>
                        <View style={styles.buttonsContainer}>
                            <Button
                                style={{
                                    ...styles.button,
                                    backgroundColor:
                                        colors.buttonBackgrounds.darkGreen,
                                }}
                                icon={
                                    <ExportIconSVG
                                        width={sizes.menuButtonSizes}
                                        height={sizes.menuButtonSizes}
                                    />
                                }
                                title="EXPORT DATA"
                                onPress={() => {
                                    exportHandler(props.gameDataRef);
                                }}
                            />
                            <Button
                                style={styles.button}
                                icon={
                                    <BackIconSVG
                                        width={sizes.menuButtonSizes}
                                        height={sizes.menuButtonSizes}
                                    />
                                }
                                title="MAIN MENU"
                                onPress={mainMenuPressHandler}
                            />
                        </View>
                        <Text style={styles.title}>FULL GAME SUMMARY</Text>
                        <FullGameTimes gameDataRef={props.gameDataRef} />
                        <Text style={styles.title}>PLAYERS SUMMARY</Text>
                        <PlayersTimes gameDataRef={props.gameDataRef} />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryScreen: { flex: 1 },
    container: {
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        color: "black",
        fontSize: fontSizes.summaryHeading,
        width: "100%",
        paddingHorizontal: "5%",
        textAlign: "center",
        marginTop: 20,
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
});

export default SummaryScreen;
