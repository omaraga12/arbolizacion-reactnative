import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../utils/Loading";
import { map } from "lodash";
import {
  ActualizarProgramacion,
  EliminarProgramacion,
  getProgramaciones,
  RegisterProgramacion,
} from "../api/Programacion";

import { getTokenApi } from "../api/token";
import ValidadorEliminar from "./ValidadorEliminar";

export default function Programacion() {
  const navigation = useNavigation();
  const [nombre, setNombre] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");
  const [id, setId] = useState("");
  const [editing, setEditing] = useState(false);
  const [prograciones, setProgramaciones] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(null);

  const fetch = async () => {
    setLoading(true);

    const response = await getProgramaciones();

    setProgramaciones(response.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);

  const register = async () => {
    if (nombre.length > 0 && fecha_inicio.length > 0 && fecha_fin.length > 0) {
      setLoading(true);
      const token = await getTokenApi();
      if (editing) {
        const response = await ActualizarProgramacion(
          id,
          nombre,
          fecha_inicio,
          fecha_fin,
          token
        );
        if (response == 0) {
          alert("Error al actualizar");
          setLoading(false);
        } else {
          setLoading(false);
          alert("Actualizado");
          setEditing(false);
          setNombre("");
          setFecha_inicio("");
          setFecha_fin("");
          fetch();
        }
      } else {
        const response = await RegisterProgramacion(
          nombre,
          fecha_inicio,
          fecha_fin,
          token
        );
        if (response == 0) {
          alert("Error al registrar");
          setLoading(false);
        } else {
          setLoading(false);
          alert("Registrado");
          setNombre("");
          setFecha_inicio("");
          setFecha_fin("");
          fetch();
        }
      }
    }
  };
  const handleEditar = (id, nombre, fecha_inicio, fecha_fin) => {
    setEditing(true);
    setId(id);
    setNombre(nombre);
    setFecha_inicio(fecha_inicio);
    setFecha_fin(fecha_fin);
  };
  const goToHorarios = (nombre, id) => {
    navigation.navigate("Horarios", { nombreProgra: nombre, id: id });
  };
  const handleEliminar = async (id) => {
    setLoading(true);
    const token = await getTokenApi();
    const response = await EliminarProgramacion(id, token);
    if (response === 0) {
      alert("Error", "Error al eliminar");
      setLoading(false);
    } else {
      alert("Eliminado", "Elemento eliminado exitosamente");
      setLoading(false);
      setNombre("");
      setFecha_fin("");
      setFecha_inicio("");
      fetch();
    }
  };
  const handleValidacion = (id) => {
    setId(id);
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <ValidadorEliminar
        modalVisible={modalVisible}
        funcion={handleEliminar}
        setModalVisible={setModalVisible}
        idSelected={id}
      />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha inicio"
          value={fecha_inicio}
          onChangeText={(text) => setFecha_inicio(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha fin"
          value={fecha_fin}
          onChangeText={(text) => setFecha_fin(text)}
        />

        <Button
          color="#4CAF50"
          title={editing ? "Editar" : "Agregar Programacion"}
          onPress={register}
        />
      </View>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            {map(prograciones, (Programacion) => (
              <View style={styles.tarjeta} key={Programacion.id}>
                <Text style={{ fontWeight: "bold" }}>
                  {Programacion.attributes.nombre}
                </Text>
                <Text>
                  Fecha de inicio: {Programacion.attributes.fecha_inicio}
                </Text>
                <Text>Fecha de fin: {Programacion.attributes.fecha_fin}</Text>
                <View style={styles.botonesContainer}>
                  <TouchableOpacity
                    style={styles.botonEditar}
                    onPress={() =>
                      handleEditar(
                        Programacion.id,
                        Programacion.attributes.nombre,
                        Programacion.attributes.fecha_inicio,
                        Programacion.attributes.fecha_fin
                      )
                    }
                  >
                    <Text style={styles.botonTexto}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botonEliminar}>
                    <Text
                      style={styles.botonTexto}
                      // onPress={() => handleEliminar(Programacion.id)}
                      onPress={() => handleValidacion(Programacion.id)}
                    >
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botonHorario}
                    onPress={() =>
                      goToHorarios(
                        Programacion.attributes.nombre,
                        Programacion.id
                      )
                    }
                  >
                    <Text style={styles.botonTexto}>Horario</Text>
                  </TouchableOpacity>
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
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
