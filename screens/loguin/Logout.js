import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { removeTokeapi } from "../../api/token";
import { useNavigation } from "@react-navigation/native";

export default function Logout() {
  const handleConfirm = () => {
    removeTokeapi();
    navigation.navigate("Account");
  };

  const handleCancel = () => {
    navigation.navigate("ArbolVisualization");
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¿Estás seguro de cerrar sesión?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
