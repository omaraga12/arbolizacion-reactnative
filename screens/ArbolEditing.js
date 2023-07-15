import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import ValidadorEliminar from "./ValidadorEliminar";

import {
  ActualizarArboles,
  EliminarArboles,
  getArbolesByID,
} from "../api/Arbol";
import { getZonas } from "../api/Zona";
import { getEspecies } from "../api/Especies";
import { getFamilias } from "../api/Familia";
import { getTokenApi } from "../api/token";

import { map } from "lodash";
import { Picker } from "@react-native-picker/picker";
import Loading from "../utils/Loading";
import { useNavigation } from "@react-navigation/native";
export default function ArbolEditing({ route }) {
  const { id } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const [descripcion, setDescripcion] = useState("");
  const [coor_latitud, setCoor_latitud] = useState("");
  const [coor_longitud, setCoor_longitud] = useState("");
  const [especieID, setEspecieId] = useState("");
  const [zonaId, setZonaID] = useState("");
  const [familiaId, setFamiliaID] = useState("");
  const [foto, setfoto] = useState(null);
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [zonas, setZonas] = useState(null);
  const [arboles, setArboles] = useState(null);
  const [familias, setFamilias] = useState(null);
  const [idSelected, setIdSelected] = useState("");
  const [loading, setLoading] = useState(null);
  const [editing, setEditing] = useState(false);
  const [especies, setEspecies] = useState(null);
  const navigation = useNavigation();
  const handleEliminar = async (id) => {
    setLoading(true);
    const token = await getTokenApi();
    const response = await EliminarArboles(id, token);
    if (response === 0) {
      alert("Error", "Error al eliminar");
      setLoading(false);
    } else {
      alert("Eliminado", "Elemento eliminado exitosamente");
      setLoading(false);
      navigation.navigate("arbolRegister");
    }
  };
  const fetch = async () => {
    setLoading(true);

    const [responseArboles, responseZonas, responseEspecies, responseFamilias] =
      await Promise.all([
        getArbolesByID(id),
        getZonas(),
        getEspecies(),
        getFamilias(),
      ]);
    setArboles(responseArboles.data);
    setZonas(responseZonas.data);
    setEspecies(responseEspecies.data);
    setFamilias(responseFamilias.data);
    // console.log(responseArboles.data);

    setDescripcion(responseArboles.data.attributes.descripcion);
    setFecha_nacimiento(responseArboles.data.attributes.fecha_nacimiento);
    setCoor_latitud(responseArboles.data.attributes.coor_latitud.toString());
    setCoor_longitud(responseArboles.data.attributes.coor_longitud.toString());

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

  const register = async () => {
    if (
      descripcion.length > 0 &&
      coor_latitud.length > 0 &&
      coor_longitud.length > 0
      //tipoID.length > 0 &&
      // responsableID.length > 0
    ) {
      setLoading(true);
      const token = await getTokenApi();
      const decoded = jwt_decode(token);

      const response = await ActualizarArboles(
        id,
        descripcion,
        coor_latitud,
        coor_longitud,
        especieID,
        zonaId,
        decoded.id,
        foto,
        fecha_nacimiento,
        token,
        familiaId
      );
      if (response == 0) {
        alert("Error al actualizar");
        setLoading(false);
      } else {
        setLoading(false);
        alert("Actualizado");
        setEditing(false);

        fetch();
      }
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <ValidadorEliminar
            modalVisible={modalVisible}
            funcion={handleEliminar}
            setModalVisible={setModalVisible}
            idSelected={idSelected}
          />

          <ScrollView>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={descripcion}
                onChangeText={(text) => setDescripcion(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Fecha de nacimiento"
                value={fecha_nacimiento}
                onChangeText={(text) => setFecha_nacimiento(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Longitud"
                value={coor_longitud}
                onChangeText={(text) => setCoor_longitud(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Latitud"
                value={coor_latitud}
                onChangeText={(text) => setCoor_latitud(text)}
              />

              <View
                style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
              >
                <Picker
                  selectedValue={especieID}
                  onValueChange={(itemValue, itemIndex) =>
                    setEspecieId(itemValue)
                  }
                >
                  {map(especies, (especie) => (
                    <Picker.Item
                      key={especie.id}
                      label={especie.attributes.nombre}
                      value={especie.id}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
              >
                <Picker
                  selectedValue={familiaId}
                  onValueChange={(itemValue, itemIndex) =>
                    setFamiliaID(itemValue)
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
              <View
                style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
              >
                <Picker
                  selectedValue={zonaId}
                  onValueChange={(itemValue, itemIndex) => setZonaID(itemValue)}
                >
                  {map(zonas, (zona) => (
                    <Picker.Item
                      key={zona.id}
                      label={zona.attributes.nombre}
                      value={zona.id}
                    />
                  ))}
                </Picker>
              </View>

              <Button color="#4CAF50" title="Editar" onPress={register} />
              <Button
                color="#4CAF50"
                title="Eliminar"
                onPress={() => handleEliminar(id)}
              />
            </View>
          </ScrollView>
        </View>
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
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  botonEditar: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botonEliminar: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botonHorario: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  imagen: {
    //width: 100,
    height: 200,
    resizeMode: "repeat",
  },
});
