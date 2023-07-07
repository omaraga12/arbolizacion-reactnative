import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import colors from "./utils/colors";
import Cabecera from "./screens/menu/Cabecera";
import AppNavigation from "./navigation/appNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* <StatusBar style="dark" backgroundColor={colors.primary} /> */}

        <Cabecera />
        <AppNavigation />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
