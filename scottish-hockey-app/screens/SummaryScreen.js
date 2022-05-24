import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Header from "../components/UI/Header";
import FullGameTimes from "../components/Summary/FullGameTimes";
import PlayersTimes from "../components/Summary/PlayersTimes";
import Button from "../components/UI/Button";
import colors from "../constants/colors";
import ExportIconSVG from "../assets/exportIcon.svg";
import BackIconSVG from "../assets/backIcon.svg";
import sizes from "../constants/sizes";

const SummaryScreen = (props) => {
    const changePage = (newPage) => {
        props.onPageChange(newPage);
    };

    return (
        <View style={styles.summaryScreen}>
            <Header title="GAME SUMMARY" />
            <ScrollView>
                <View style={styles.container}>
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
                            onPress={() => {}}
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
                            onPress={() => {
                                changePage("home");
                            }}
                        />
                    </View>
                    <Text style={styles.title}>FULL GAME SUMMARY</Text>
                    <FullGameTimes gameDataRef={props.gameDataRef} />
                    <Text style={styles.title}>PLAYERS SUMMARY</Text>
                    <PlayersTimes gameDataRef={props.gameDataRef} />
                </View>
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
        fontSize: 60,
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
