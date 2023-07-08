import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RegisterFamilia, getFamilias } from "../api/Familia";
import { map } from "lodash";
import Loading from "../utils/Loading";
import { getTokenApi } from "../api/token";
export default function Familias() {
  const [descripcion, setDescripcion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [familias, setFamilias] = useState(false);
  const fetch = async () => {
    setLoading(true);
    const response = await getFamilias();
    // console.log(response.data);
    setFamilias(response.data);
    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

  const register = async () => {
    if (descripcion.length > 0) {
      setLoading(true);
      const token = await getTokenApi();
      console.log(token);
      const response = await RegisterFamilia(descripcion, token);
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
          placeholder="Descripción"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text)}
        />
        <Button color="#4CAF50" title="Agregar Familia" onPress={register} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(familias, (familia) => (
              <View style={styles.tarjeta} key={familia.id}>
                <Text>{familia.attributes.descripcion}</Text>
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
