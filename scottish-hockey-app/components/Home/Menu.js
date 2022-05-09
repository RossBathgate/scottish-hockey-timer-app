import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../UI/Button";
import colors from "../../constants/colors";

/*
    A menu containing the home page buttons
*/
const Menu = (props) => {
    const testHandler = () => {
        console.log("Changing Page. (Uncomment code in Menu.js to execute)");
        // props.onPageChange("game");
    };

    return (
        <View style={styles.container}>
            <Button
                onPress={testHandler}
                icon=""
                title="START GAME"
                style={{
                    ...styles.button,
                    backgroundColor: colors.buttonBackgrounds.paleGreen,
                }}
            />
            <Button
                onPress={testHandler}
                icon=""
                title="SETTINGS"
                style={styles.button}
            />
            <Button
                onPress={testHandler}
                icon=""
                title="LOAD PLAYERS"
                style={styles.button}
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
});

export default Menu;
