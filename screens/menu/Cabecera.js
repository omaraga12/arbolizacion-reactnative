import React from "react";
import { View, StyleSheet, Image } from "react-native";
import logo from "../../assets/logo2.png";
import DrawerMenu from "./DrawerMenu";
import colors from "../../utils/colors";
export default function Cabecera() {
  return (
    <View style={Styles.container}>
      <View style={Styles.image}>
        {/* <TouchableOpacity onPress={() => navigation.push("home")}> */}
        <Image source={logo} style={Styles.logo} />
        {/* </TouchableOpacity> */}
      </View>

      <View style={Styles.menu}>
        <DrawerMenu />
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgLight,
    //paddingVertical: 10,
    //paddingHorizontal: 60,
    //zIndex: 1,
    //flex: 1,
    flexDirection: "row-reverse",
    height: 60,
    alignItems: "center",
    //justifyContent: "space-between",
  },
  menu: {
    width: "20%",
  },
  image: {
    width: "80%",
  },
  cart: {
    width: "20%",
    alignItems: "flex-end",
  },
  logo: {
    width: "80%",
    height: 60,
    resizeMode: "contain",
  },
});
