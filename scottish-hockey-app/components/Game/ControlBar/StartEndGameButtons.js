import React from "react";
import Button from "../../UI/Button";
import fontSizes from "../../../constants/fontSizes";

const StartEndGameButtons = (props) => {
    if (props.isGameStart) {
        return (
            <Button
                textStyle={{ fontSize: fontSizes.controlBarButton }}
                onPress={props.endGameHandler}
                title="END GAME"
            />
        );
    } else {
        return (
            <Button
                textStyle={{ fontSize: fontSizes.controlBarButton }}
                onPress={props.startGameHandler}
                title="START GAME"
            />
        );
    }
};

export default StartEndGameButtons;
