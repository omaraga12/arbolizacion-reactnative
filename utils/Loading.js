import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Modal,
  Image,
  View,
} from "react-native";

export default function Loading(props) {
  const { text, size, color } = props;
  return (
    // <Modal animationType="slide" transparent={true}>
    <View style={Styles.modal}>
      <SafeAreaView style={Styles.container}>
        <Image style={Styles.image} source={require("../assets/arbol.png")} />
        <ActivityIndicator size={size} color={color} style={Styles.loading} />
        <Text style={Styles.title}>{text}</Text>
      </SafeAreaView>
    </View>
    //</Modal>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: { marginBottom: 10 },
  title: {
    fontSize: 18,
  },
  image: {
    height: 500,
    width: 300,
    resizeMode: "contain",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

Loading.defaultProps = {
  text: "Cargando...",
  color: "#000",
};
