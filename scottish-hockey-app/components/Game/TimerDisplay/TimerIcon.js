import Svg, { Circle, Text, Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

const TimerIcon = (props) => {
    let content;
    if (props.type === "P") {
        content = timerIcons.timerP;
    } else if (props.type === "B") {
        content = timerIcons.timerB;
    } else if (props.type === "fullGame") {
        content = timerIcons.fullGame;
    } else if (props.type === "quarter") {
        content = timerIcons.quarter;
    }
    return (
        <View style={{ ...styles.container, ...props.style }}>{content}</View>
    );
};

const timerIcons = {
    fullGame: (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
                cx="50"
                cy="50"
                r="45"
                fill={Colors.timerColors.primary}
                stroke={Colors.timerColors.secondary}
                strokeWidth="10"
            />
        </Svg>
    ),
    quarter: (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
                cx="50"
                cy="50"
                r="45"
                fill={Colors.timerColors.secondary}
            />
            <Path
                fill={Colors.timerColors.primary}
                stroke={Colors.timerColors.secondary}
                strokeWidth="4"
                d="M 50, 5 A 45 45 0 0 1 95 50 L 50 50"
            />
        </Svg>
    ),
    timerP: (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
                cx="50"
                cy="50"
                r="45"
                fill={Colors.timerColors.secondary}
            />
            <Text
                fill={Colors.timerColors.primary}
                fontSize="60"
                stroke={Colors.timerColors.primary}
                strokeWidth="4"
                x={50}
                y={70}
                textAnchor="middle"
            >
                P
            </Text>
        </Svg>
    ),
    timerB: (
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
                cx="50"
                cy="50"
                r="45"
                fill={Colors.timerColors.secondary}
            />
            <Text
                fill={Colors.timerColors.primary}
                fontSize="60"
                stroke={Colors.timerColors.primary}
                strokeWidth="4"
                x={50}
                y={70}
                textAnchor="middle"
            >
                B
            </Text>
        </Svg>
    ),
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 25,
        height: 25,
    },
});

export default TimerIcon;
