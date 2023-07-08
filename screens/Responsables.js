import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Image,
} from "react-native";

import Loading from "../utils/Loading";
import { map } from "lodash";
import { getResponsables, RegisterResponsable } from "../api/Responsable";

import { getTokenApi } from "../api/token";

export default function Responsables() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [dni, setDni] = useState("");

  const [responsables, setResponsables] = useState(null);

  const [loading, setLoading] = useState(null);

  const fetch = async () => {
    setLoading(true);

    const response = await getResponsables();

    setResponsables(response.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

  const register = async () => {
    if (nombres.length > 0 && apellidos.length > 0) {
      setLoading(true);
      const token = await getTokenApi();

      const response = await RegisterResponsable(
        nombres,
        apellidos,
        dni,
        token
      );
      if (response == 0) {
        alert("Error al registrar");
        setLoading(false);
      } else {
        setLoading(false);
        alert("Registrado");

        fetch();
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={nombres}
          onChangeText={(text) => setNombres(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={(text) => setApellidos(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="DNI"
          value={dni}
          onChangeText={(text) => setDni(text)}
          keyboardType="numeric"
        />

        <Button
          color="#4CAF50"
          title="Agregar Responsable"
          onPress={register}
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(responsables, (responsable) => (
              <View style={styles.tarjeta} key={responsable.id}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/6266/6266024.png",
                    }}
                    style={{ width: 80, height: 80, marginRight: 10 }} // Ajusta el tamaño según tus necesidades
                  />
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      Nombre: {responsable.attributes.nombres}
                    </Text>
                    <Text>Apellidos: {responsable.attributes.apellidos}</Text>
                    <Text>DNI: {responsable.attributes.dni}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  listaEvoluciones: {
    flex: 1,
  },
  tarjeta: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
  },
});
