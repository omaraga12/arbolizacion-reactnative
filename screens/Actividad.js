import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { map } from "lodash";
import Loading from "../utils/Loading";
import { RegisterActividad, getActividadesByHorario } from "../api/Actividad";
Loading;
export default function Actividad({ route }) {
  const { id, actividadNombre } = route.params;
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [actividades, setActividades] = useState("");
  const fetch = async () => {
    setLoading(true);

    const [response] = await Promise.all([getActividadesByHorario(id)]);
    setActividades(response.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

  const register = async () => {
    if (fecha.length > 0 && descripcion.length > 0) {
      setLoading(true);
      //const token = await getTokenApi();

      const response = await RegisterActividad(fecha, descripcion, id);
      if (response == 0) {
        alert("Error al registrar");
        setLoading(false);
      } else {
        setLoading(false);
        alert("Registrado");
        setDescripcion("");
        setFecha("");

        fetch();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        HORARIO: {actividadNombre}
      </Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={fecha}
          onChangeText={(text) => setFecha(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text)}
        />

        <Button color="#4CAF50" title="Agregar Actividad" onPress={register} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(actividades, (actividad) => (
              <View style={styles.tarjeta} key={actividad.id}>
                <Text style={{ fontWeight: "bold" }}>
                  {actividad.attributes.descripcion}
                </Text>
                <Text>Fecha: {actividad.attributes.fecha}</Text>
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
