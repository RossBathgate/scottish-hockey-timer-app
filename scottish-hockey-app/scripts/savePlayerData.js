import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function savePlayerData(data) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("@playerData", jsonValue);
    } catch (e) {
        // saving error
        console.log(
            "An unexpected error occured while trying to save player data:\n\n",
            e
        );
    }
}
