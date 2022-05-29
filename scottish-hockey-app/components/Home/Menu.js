import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../UI/Button";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import fontSizes from "../../constants/fontSizes";
import AddIconSVG from "./../../assets/addIcon.svg";
import SettingsIconSVG from "./../../assets/settingsIcon.svg";
import ExportIconSVG from "./../../assets/exportIcon.svg";

/*
    A menu containing the home page buttons
*/
const Menu = (props) => {
    const changePage = (newPage) => {
        props.onPageChange(newPage);
    };

    return (
        <View style={styles.container}>
            <View style={styles.startContainer}>
                {props.errorText.length > 0 ? (
                    <View style={styles.errorTextContainer}>
                        <Text style={styles.errorText}>{props.errorText}</Text>
                    </View>
                ) : (
                    <Button
                        onPress={() => changePage("game")}
                        icon={
                            <AddIconSVG
                                width={sizes.menuButtonSizes}
                                height={sizes.menuButtonSizes}
                            />
                        }
                        title="START GAME"
                        style={{
                            ...styles.button,
                            backgroundColor: colors.buttonBackgrounds.paleGreen,
                        }}
                        textStyle={{ fontSize: fontSizes.homePageButtons }}
                    />
                )}
            </View>
            {/* <Button
                onPress={() => changePage("home")}
                icon={
                    <SettingsIconSVG
                        width={sizes.menuButtonSizes}
                        height={sizes.menuButtonSizes}
                    />
                }
                title="SETTINGS"
                style={styles.button}
                textStyle={{ fontSize: fontSizes.homePageButtons }}
            /> */}
            <Button
                onPress={() => changePage("playerData")}
                icon={
                    <ExportIconSVG
                        width={sizes.menuButtonSizes}
                        height={sizes.menuButtonSizes}
                    />
                }
                title="LOAD PLAYERS"
                style={styles.button}
                textStyle={{ fontSize: fontSizes.homePageButtons }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "flex-start",
        justifyContent: "space-around",
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginVertical: 7,
        marginLeft: 30,
        width: "50%",
        borderRadius: 5,
        backgroundColor: colors.buttonBackgrounds.grey,
    },
    startContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    errorTextContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 50,
        maxWidth: "40%",
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

export default Menu;
