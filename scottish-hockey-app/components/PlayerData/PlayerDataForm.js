import React, { useReducer } from "react";
import { Text, View, StyleSheet } from "react-native";
import FormInput from "../UI/FormInput";
import Select from "../UI/Select";
import colors from "../../constants/colors";
import sizes from "../../constants/sizes";
import Button from "../UI/Button";
import BackIconSVG from "../../assets/backIcon.svg";
import AddPlayerIcon from "../../assets/addIcon.svg";

const playerReducer = (state, action) => {
    let stateCopy = { ...state };
    switch (action.msg) {
        case "firstname":
            stateCopy.firstname = action.value;
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
                firstname: "",
                surname: "",
                position: "Goalie",
                playerNumber: "",
            };
            return stateCopy;
    }
};
const PlayerDataForm = (props) => {
    const [playerInfo, dispatchPlayerInfo] = useReducer(playerReducer, {
        firstname: "",
        surname: "",
        position: "Goalie",
        playerNumber: "",
    });

    const addPlayerHandler = () => {
        if (
            playerInfo.firstname.length > 0 &&
            playerInfo.surname.length > 0 &&
            playerInfo.position.length > 0 &&
            playerInfo.playerNumber.length > 0
        ) {
            props.onAddPlayer({
                ...playerInfo,
                formationIdx: 0,
                mostRecentSwitch: 0,
                previousTotalPitchTime: 0,
                previousQuarterPitchTime: 0,
                totalTimeOfAllPreviousQuarters: 0,
            });
            dispatchPlayerInfo({ msg: "reset" });
        } else {
            props.onError("Do not leave any fields blank.");
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <FormInput
                    label="PLAYER FIRSTNAME"
                    inputValue={playerInfo.firstname}
                    onChangeText={(newText) => {
                        dispatchPlayerInfo({
                            msg: "firstname",
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
