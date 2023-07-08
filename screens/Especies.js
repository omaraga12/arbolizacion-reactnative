import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { getEspecies } from "../api/Especies";
import Loading from "../utils/Loading";
import { map } from "lodash";
import { getFamilias } from "../api/Familia";

export default function Especies() {
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [familiaID, setFamiliaID] = useState(null);
  const [familias, setFamilias] = useState(null);
  const [especies, setEspecies] = useState(null);
  const [loading, setLoading] = useState(null);
  const fetch = async () => {
    setLoading(true);

    const [responseFamilias, responseEspecies] = await Promise.all([
      getFamilias(),
      getEspecies(),
    ]);
    setFamilias(responseFamilias.data);
    setEspecies(responseEspecies.data);
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

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
        <Button color="#4CAF50" title="Agregar Especie" />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(especies, (especie) => (
              <View style={styles.tarjeta} key={especie.id}>
                <Text>{especie.attributes.descripcion}</Text>
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
