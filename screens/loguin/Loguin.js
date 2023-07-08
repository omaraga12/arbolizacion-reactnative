import React, { useState } from "react";
import useAuth from "./useAuth";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Loading from "../../utils/Loading";
import { loginApi } from "../../api/User";
import { setTokenApi, getTokenApi, removeTokeapi } from "../../api/token";
import { useNavigation } from "@react-navigation/native";
export default function Loguin(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [loading, setLoading] = useState(false);
  const { changeForm } = props;
  //const { login } = useAuth();
  const login = (user) => {
    setTokenApi(user.jwt);
    // setAuth({
    //   token: user.jwt,
    //   idUser: user.user._id,
    // });
  };

  const loguinUser = async () => {
    setLoading(true);
    try {
      const response = await loginApi(email, clave);
      if (response.error) {
        alert("Contraseña o Email incorrectos");
        setLoading(false);
      } else {
        login(response);
        const token = await getTokenApi();

        setLoading(false);
        navigation.navigate("ArbolVisualization");
      }
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  return (
    <View style={{ padding: 20 }}>
      {loading ? (
        <Loading />
      ) : (
        <View>
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

          <TouchableOpacity style={styles.buttonContainer} onPress={loguinUser}>
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
