import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import Loading from "../utils/Loading";
import { map } from "lodash";
import { getEvaluaciones, RegisterEvaluaciones } from "../api/Estadoevaluacion";
import { Picker } from "@react-native-picker/picker";
import { getTokenApi } from "../api/token";

export default function Evaluacion() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [Evaluaciones, setEvaluaciones] = useState(null);

  const [loading, setLoading] = useState(null);

  const fetch = async () => {
    setLoading(true);

    const response = await getEvaluaciones();

    setEvaluaciones(response.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

  const register = async () => {
    if (nombre.length > 0 && descripcion.length > 0) {
      setLoading(true);
      const token = await getTokenApi();

      const response = await RegisterEvaluaciones(nombre, descripcion, token);
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
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text)}
        />

        <Button
          color="#4CAF50"
          title="Agregar Estado de Evaluacion"
          onPress={register}
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(Evaluaciones, (Evaluacion) => (
              <View style={styles.tarjeta} key={Evaluacion.id}>
                <Text style={{ fontWeight: "bold" }}>
                  {Evaluacion.attributes.nombre}
                </Text>
                <Text>Descripcion: {Evaluacion.attributes.descripcion}</Text>
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
