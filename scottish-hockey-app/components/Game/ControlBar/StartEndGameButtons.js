import React from "react";
import Button from "../../UI/Button";

const StartEndGameButtons = (props) => {
    if (props.isGameStart) {
        return <Button onPress={props.endGameHandler} title="END GAME" />;
    } else {
        return <Button onPress={props.startGameHandler} title="START GAME" />;
    }
};

export default StartEndGameButtons;
