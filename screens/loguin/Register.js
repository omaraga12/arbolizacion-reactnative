import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { registerApi } from "../../api/User";
import Loading from "../../utils/Loading.js";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const { changeForm } = props;

  const RegisterUser = async () => {
    if (clave.length > 5) {
      setLoading(true);
      const response = await registerApi(dni, nombre, apellidos, email, clave);
      if (response == 0) {
        alert(
          "Error al registrar usuario, correo o usuario en uso o faltan completar datos"
        );
      } else {
        alert("Usuario registrado");
        changeForm();
      }
      setLoading(false);
    } else {
      alert("La clave debe tener al menos seis caracteres");
    }
  };
  return (
    <View style={{ padding: 20 }}>
      {loading ? (
        <Loading text="Cargando..." />
      ) : (
        <View>
          <TextInput
            placeholder="Nombres"
            style={styles.input}
            onChangeText={(text) => setNombre(text)}
            value={nombre}
          />
          <TextInput
            placeholder="Apellidos"
            style={styles.input}
            onChangeText={(text) => setApellidos(text)}
            value={apellidos}
          />
          <TextInput
            placeholder="DNI"
            style={styles.input}
            onChangeText={(text) => setDni(text.replace(/ /g, ""))}
            value={dni}
            keyboardType="numeric"
          />
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
            onPress={RegisterUser}
          >
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonContainer, { backgroundColor: "transparent" }]}
            onPress={changeForm}
          >
            <Text style={[styles.buttonText, { color: "#2ecc71" }]}>
              INICIAR SESION
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
