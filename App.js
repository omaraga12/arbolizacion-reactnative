import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DrawerMenu from "./screens/menu/DrawerMenu";
import colors from "./utils/colors";
import Cabecera from "./screens/menu/Cabecera";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      {/* <DrawerMenu /> */}
      <Cabecera />
      <Text>Open up App.js to start working on your app!</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
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
