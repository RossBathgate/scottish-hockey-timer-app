import React, { useReducer, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import FormInput from "../UI/FormInput";
import Select from "../UI/Select";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import fontSizes from "../../constants/fontSizes";
import Button from "../UI/Button";
import BackIconSVG from "../../assets/backIcon.svg";
import AddPlayerIcon from "../../assets/addIcon.svg";

const playerReducer = (state, action) => {
    let stateCopy = { ...state };
    switch (action.msg) {
        case "firstName":
            stateCopy.firstName = action.value;
            return stateCopy;
        case "surname":
            stateCopy.surname = action.value;
            return stateCopy;
        case "position":
            stateCopy.position = action.value;
            return stateCopy;
        case "playerNumber":
            stateCopy.playerNumber = action.value;
            return stateCopy;
        case "reset":
            stateCopy = {
                firstName: "",
                surname: "",
                position: action.value,
                playerNumber: "",
            };
            return stateCopy;
    }
};
const PlayerDataForm = (props) => {
    const [selectedPositionOption, setSelectedPositionOption] =
        useState("Goalie");

    const [playerInfo, dispatchPlayerInfo] = useReducer(playerReducer, {
        firstName: "",
        surname: "",
        position: selectedPositionOption,
        playerNumber: "",
    });

    const addPlayerHandler = () => {
        if (
            playerInfo.firstName.length > 0 &&
            playerInfo.surname.length > 0 &&
            playerInfo.position.length > 0 &&
            playerInfo.playerNumber.length > 0
        ) {
            props.onAddPlayer(playerInfo);
            dispatchPlayerInfo({ msg: "reset", value: selectedPositionOption });
        } else {
            props.onError("Do not leave any fields blank.");
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <FormInput
                    label="PLAYER FIRSTNAME"
                    inputValue={playerInfo.firstName}
                    onChangeText={(newText) => {
                        dispatchPlayerInfo({
                            msg: "firstName",
                            value: newText,
                        });
                        props.onClearError();
                    }}
                />
                <FormInput
                    label="PLAYER SURNAME"
                    inputValue={playerInfo.surname}
                    onChangeText={(newText) => {
                        dispatchPlayerInfo({
                            msg: "surname",
                            value: newText,
                        });
                        props.onClearError();
                    }}
                />
                <Select
                    label="PLAYER POSITION"
                    options={[
                        "Goalie",
                        "Fullback",
                        "Half Back",
                        "Midfield",
                        "Forward",
                        "Bench",
                    ]}
                    onChangeItem={(newItem) => {
                        setSelectedPositionOption(newItem);
                        dispatchPlayerInfo({
                            msg: "position",
                            value: newItem,
                        });
                        props.onClearError();
                    }}
                />
                <FormInput
                    label="PLAYER NUMBER"
                    inputValue={playerInfo.playerNumber}
                    onChangeText={(newText) => {
                        dispatchPlayerInfo({
                            msg: "playerNumber",
                            value: newText,
                        });
                        props.onClearError;
                    }}
                    keyboardType="number-pad"
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    style={styles.button}
                    textStyle={{ fontSize: fontSizes.formButton }}
                    icon={
                        <BackIconSVG
                            width={sizes.menuButtonSizes}
                            height={sizes.menuButtonSizes}
                        />
                    }
                    title="BACK"
                    onPress={props.onBackPress}
                />
                <Button
                    style={{
                        ...styles.button,
                        backgroundColor: colors.buttonBackgrounds.paleGreen,
                    }}
                    textStyle={{ fontSize: fontSizes.formButton }}
                    icon={
                        <AddPlayerIcon
                            width={sizes.menuButtonSizes}
                            height={sizes.menuButtonSizes}
                        />
                    }
                    title="ADD PLAYER"
                    onPress={addPlayerHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: "100%", flex: 1, justifyContent: "space-between" },
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

export default PlayerDataForm;
