import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Card from "../UI/Card";
import colors from "../../constants/colors";
import RemoveSVG from "../../assets/cross.svg";
import sizes from "../../constants/sizes";

const AddedPlayers = (props) => {
    const removePlayerHandler = (playerNumber) => {
        props.onRemovePlayer(playerNumber);
    };
    return (
        <ScrollView style={styles.container}>
            {props.players.map((player) => (
                <Card
                    onPress={() => removePlayerHandler(player.playerNumber)}
                    key={player.playerNumber}
                    style={styles.card}
                >
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardText}>
                            {player.surname}, {player.firstname.substring(0, 1)}
                        </Text>
                        <Text style={styles.cardText}>{player.position}</Text>
                        <Text style={styles.cardText}>
                            #{player.playerNumber}
                        </Text>
                    </View>

                    <RemoveSVG
                        width={sizes.removeButtonSize}
                        height={sizes.removeButtonSize}
                    />
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        backgroundColor: colors.lightGreyBackground,
        padding: 10,
        borderRadius: 5,
    },
    card: {
        backgroundColor: colors.playerListBackground,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    cardText: {
        fontSize: 20,
        marginHorizontal: 20,
    },
    cardTextContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
    },
});

export default AddedPlayers;
