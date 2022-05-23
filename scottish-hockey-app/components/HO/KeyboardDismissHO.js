import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardDismissHO = (props) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {props.children}
        </TouchableWithoutFeedback>
    );
};

export default KeyboardDismissHO;
