import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function importPlayerData() {
    try {
        const jsonValue = await AsyncStorage.getItem("@playerData");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // error reading value
        console.log(
            "An unexpected error occured while trying to import player data:\n\n",
            e
        );
    }
}
