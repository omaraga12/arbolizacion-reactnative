import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "../api/Constants";
export async function setTokenApi(token) {
  try {
    await AsyncStorage.setItem(TOKEN, token);

    return true;
  } catch (error) {
    return null;
  }
}

export async function getTokenApi() {
  try {
    const token = await AsyncStorage.getItem(TOKEN);

    return token;
  } catch (error) {
    return null;
  }
}
export async function removeTokeapi() {
  try {
    await AsyncStorage.removeItem(TOKEN);
    return true;
  } catch (error) {
    return null;
  }
}
