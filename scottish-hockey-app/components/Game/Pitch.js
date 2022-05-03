import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PitchSVG from "./PitchBG.svg";

const Pitch = (props) => {
    return (
        <PitchSVG
            width="100%"
            height="75%"
            preserveAspectRatio="none"
        />
    );
};

export default Pitch;
