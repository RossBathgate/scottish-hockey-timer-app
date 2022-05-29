import React from "react";
import { StyleSheet } from "react-native";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import fontSizes from "../../../constants/fontSizes";

const QuarterButtons = (props) => {
    return (
        <Card style={styles.card}>
            {props.isQuarterStart ? (
                <Button
                    onPress={props.endQuarterHandler}
                    title="END QUARTER"
                    textStyle={{ fontSize: fontSizes.controlBarButton }}
                />
            ) : (
                <Button
                    onPress={props.startQuarterHandler}
                    title="START QUARTER"
                    textStyle={{ fontSize: fontSizes.controlBarButton }}
                />
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        height: "100%",
    },
});

export default QuarterButtons;
