import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function Loguin(props) {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const { changeForm } = props;
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={(text) => setEmail(text.replace(/ /g, ""))}
        value={email}
      />

      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setClave(text)}
        value={clave}
      />

      <TouchableOpacity
        style={styles.buttonContainer}
        //onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, { backgroundColor: "transparent" }]}
        onPress={changeForm}
      >
        <Text style={[styles.buttonText, { color: "#2ecc71" }]}>
          REGISTRARSE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = {
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "#2ecc71",
    borderRadius: 5,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
};
