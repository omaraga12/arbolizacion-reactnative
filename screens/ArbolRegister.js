import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

import {
  ActualizarArboles,
  EliminarArboles,
  RegisterArboles,
  getArboles,
} from "../api/Arbol";
import { Picker } from "@react-native-picker/picker";
import Geolocation from "react-native-geolocation-service";
import Loading from "../utils/Loading";
import { map } from "lodash";
import { getZonas } from "../api/Zona";
import { getEspecies } from "../api/Especies";
import { getTokenApi } from "../api/token";
import jwt_decode from "jwt-decode";
import ValidadorEliminar from "./ValidadorEliminar";
import { getFamilias } from "../api/Familia";
export default function ArbolRegister() {
  const navigation = useNavigation();
  const [descripcion, setDescripcion] = useState("");
  const [coor_latitud, setCoor_latitud] = useState("");
  const [coor_longitud, setCoor_longitud] = useState("");
  const [especieID, setEspecieId] = useState("");
  const [zonaId, setZonaID] = useState("");
  const [familiaId, setFamiliaID] = useState("");
  const [foto, setfoto] = useState(null);
  const [fecha_nacimiento, setFecha_nacimiento] = useState(
    new Date().toISOString()
  );

  const [modalVisible, setModalVisible] = useState(false);
  //const [programacionID, setProgramacionID] = useState(null);
  const [especies, setEspecies] = useState(null);
  const [zonas, setZonas] = useState(null);
  const [arboles, setArboles] = useState(null);
  const [familias, setFamilias] = useState(null);
  const [idSelected, setIdSelected] = useState("");
  const [loading, setLoading] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetch = async () => {
    setLoading(true);

    const [responseArboles, responseZonas, responseEspecies, responseFamilias] =
      await Promise.all([
        getArboles(),
        getZonas(),
        getEspecies(),
        getFamilias(),
      ]);
    setArboles(responseArboles.data);
    setZonas(responseZonas.data);
    setEspecies(responseEspecies.data);
    setFamilias(responseFamilias.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);
  const goToEditar = (id) => {
    navigation.navigate("arbolEditing", { id: id });
  };
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

      if (editing) {
        const response = await ActualizarArboles(
          idSelected,
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
          setCoor_latitud("");
          setCoor_longitud("");
          setDescripcion("");
          fetch();
        }
      } else {
        const response = await RegisterArboles(
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
          alert("Error al registrar");
          setLoading(false);
        } else {
          setLoading(false);
          alert("Registrado");
          setCoor_latitud("");
          setCoor_longitud("");
          setDescripcion("");

          fetch();
        }
      }
    }
  };
  const handleEditar = (id, descripciom, latitu, longiud) => {
    setEditing(true);
    setIdSelected(id);
    setCoor_latitud(latitu);
    setCoor_longitud(longiud);
    setDescripcion(descripciom);
  };
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

      setCoor_latitud("");
      setCoor_longitud("");
      setDescripcion("");
      fetch();
    }
  };
  const handleValidacion = (id) => {
    setIdSelected(id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
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
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Latitud"
            value={coor_latitud}
            onChangeText={(text) => setCoor_latitud(text)}
            keyboardType="numeric"
          />

          <View
            style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
          >
            <Picker
              selectedValue={especieID}
              onValueChange={(itemValue, itemIndex) => setEspecieId(itemValue)}
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
              onValueChange={(itemValue, itemIndex) => setFamiliaID(itemValue)}
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

          <Button
            color="#4CAF50"
            title={editing ? "Editar" : "Agregar Arbol"}
            onPress={register}
          />
        </View>
        {loading ? (
          <Loading />
        ) : (
          <View>
            {map(arboles, (arbol) => (
              <View style={styles.tarjeta} key={arbol.id}>
                <View style={[styles.column, { flex: 1 }]}>
                  <Text style={{ fontWeight: "bold" }}>
                    {arbol.attributes.descripcion}
                  </Text>
                  <Text>Latitud: {arbol.attributes.coor_latitud}</Text>
                  <Text>Longitud: {arbol.attributes.coor_longitud}</Text>
                  <Text>
                    Fecha de nacimiento: {arbol.attributes.fecha_nacimiento}
                  </Text>
                  <Text>
                    Especie:
                    {(arbol.attributes.especie &&
                      arbol.attributes.especie.data &&
                      arbol.attributes.especie.data.attributes.nombre) ||
                      ""}
                  </Text>
                  <Text>
                    Familia:
                    {(arbol.attributes.familia &&
                      arbol.attributes.familia.data &&
                      arbol.attributes.familia.data.attributes.descripcion) ||
                      ""}
                  </Text>
                  <Text>
                    Zona:
                    {(arbol.attributes.zona &&
                      arbol.attributes.zona.data &&
                      arbol.attributes.zona.data.attributes.nombre) ||
                      ""}
                  </Text>

                  <View style={styles.botonesContainer}>
                    <TouchableOpacity
                      style={styles.botonEditar}
                      onPress={() => goToEditar(arbol.id)}
                    >
                      <Text style={styles.botonTexto}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botonEliminar}>
                      <Text
                        style={styles.botonTexto}
                        onPress={() => handleValidacion(arbol.id)}
                      >
                        Eliminar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.column, { flex: 1 }]}>
                  <Image
                    source={require("../assets/arbol.png")} // Ruta local a la imagen o una URL
                    style={styles.imagen}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
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
