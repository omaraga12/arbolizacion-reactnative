import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { RegisterEspecie, getEspecies } from "../api/Especies";
import Loading from "../utils/Loading";
import { map } from "lodash";
import { getFamilias } from "../api/Familia";
import { Picker } from "@react-native-picker/picker";
import { getTokenApi } from "../api/token";

export default function Especies() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [familiaID, setFamiliaID] = useState(null);
  const [familias, setFamilias] = useState(null);
  const [especies, setEspecies] = useState(null);
  const [loading, setLoading] = useState(null);
  const [selectedFamilia, setSelectedFamilia] = useState(null);
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

  const register = async () => {
    if (nombre.length > 0 && descripcion.length > 0) {
      setLoading(true);
      const token = await getTokenApi();
      console.log(nombre + descripcion + selectedFamilia);
      const response = await RegisterEspecie(
        nombre,
        descripcion,
        selectedFamilia,
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
        <View style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}>
          <Picker
            selectedValue={selectedFamilia}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedFamilia(itemValue)
            }
          >
            {map(familias, (familia) => (
              <Picker.Item
                key={familia.id}
                label={familia.attributes.descripcion}
                value={familia.id}
              />
            ))}
          </Picker>
        </View>

        <Button color="#4CAF50" title="Agregar Especie" onPress={register} />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(especies, (especie) => (
              <View style={styles.tarjeta} key={especie.id}>
                <Text style={{ fontWeight: "bold" }}>
                  {especie.attributes.nombre}
                </Text>
                <Text>Descripcion: {especie.attributes.descripcion}</Text>
                <Text>
                  Familia:{" "}
                  {(especie.attributes.familia &&
                    especie.attributes.familia.data &&
                    especie.attributes.familia.data.attributes.descripcion) ||
                    ""}
                </Text>
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
