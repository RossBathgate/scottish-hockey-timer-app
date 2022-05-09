import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Menu from "../components/Home/Menu";

const HomeScreen = (props) => {
    return (
        <View style={styles.homeScreen}>
            <Text>Scottish Hockey Icon Here</Text>
            <Menu onPageChange={props.onPageChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    homeScreen: { flex: 1, justifyContent: "space-between" },
});

export default HomeScreen;
