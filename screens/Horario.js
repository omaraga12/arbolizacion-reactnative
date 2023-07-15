import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  getHorarios,
  RegisterHorarios,
  EliminarHorarios,
  ActualizarHorarios,
  getHorariosByProgramacion,
  validarCruceHorrios,
} from "../api/Horario";
import { getResponsables } from "../api/Responsable";
import { getTipoTratamientos } from "../api/TipoTratamiento";
import { getProgramaciones } from "../api/Programacion";
import Loading from "../utils/Loading";
import { map } from "lodash";

import { Picker } from "@react-native-picker/picker";
import { getTokenApi } from "../api/token";
import ValidadorEliminar from "./ValidadorEliminar";
import { useNavigation } from "@react-navigation/native";
export default function Horario({ route }) {
  const { id, nombreProgra } = route.params;
  const navigation = useNavigation();
  const [dia, setDia] = useState("");
  const [hora_inicio, setHora_inicio] = useState("");
  const [hora_fin, setHora_fin] = useState("");
  const [tipoID, setTipoId] = useState(null);
  const [responsableID, setResponsableId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  //const [programacionID, setProgramacionID] = useState(null);
  const [responsables, setResponsables] = useState(null);
  const [tipos, setTipos] = useState(null);
  const [horarios, setHorarios] = useState(null);
  const [idSelected, setIdSelected] = useState("");
  const [loading, setLoading] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetch = async () => {
    setLoading(true);

    const [responseHorarios, responseTipos, responseResponsables] =
      await Promise.all([
        getHorariosByProgramacion(id),
        getTipoTratamientos(),
        getResponsables(),
      ]);
    setHorarios(responseHorarios.data);
    setTipos(responseTipos.data);
    setResponsables(responseResponsables.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);
  const goToActividades = (id, nombre) => {
    navigation.navigate("Actividad", { id: id, actividadNombre: nombre });
  };

  const register = async () => {
    if (
      dia.length > 0 &&
      hora_inicio.length > 0 &&
      hora_fin.length > 0
      //tipoID.length > 0 &&
      // responsableID.length > 0
    ) {
      setLoading(true);
      const token = await getTokenApi();
      const validacion = await validarCruceHorrios(
        dia,
        hora_inicio,
        hora_fin,
        id
      );
      console.log(validacion);
      if (validacion == 0) {
        if (editing) {
          console.log(idSelected);
          console.log(tipoID);
          const response = await ActualizarHorarios(
            idSelected,
            tipoID,
            id,
            responsableID,
            dia,
            hora_inicio,
            hora_fin
          );
          if (response == 0) {
            alert("Error al actualizar");
            setLoading(false);
          } else {
            setLoading(false);
            alert("Actualizado");
            setEditing(false);
            setHora_inicio("");
            setHora_fin("");
            fetch();
          }
        } else {
          const response = await RegisterHorarios(
            tipoID,
            id,
            responsableID,
            dia,
            hora_inicio,
            hora_fin
          );
          if (response == 0) {
            alert("Error al registrar");
            setLoading(false);
          } else {
            setLoading(false);
            alert("Registrado");
            setHora_inicio("");
            setHora_fin("");

            fetch();
          }
        }
      } else {
        alert("Existe cruce de horarios");
        fetch();
      }
    }
  };
  const handleEditar = (id, hora_inicio, hora_fin) => {
    setEditing(true);
    setIdSelected(id);
    setHora_inicio(hora_inicio);
    setHora_fin(hora_fin);
  };
  const handleEliminar = async (id) => {
    setLoading(true);
    const token = await getTokenApi();
    const response = await EliminarHorarios(id, token);
    if (response === 0) {
      alert("Error", "Error al eliminar");
      setLoading(false);
    } else {
      alert("Eliminado", "Elemento eliminado exitosamente");
      setLoading(false);

      setHora_inicio("");
      setHora_fin("");
      fetch();
    }
  };
  const handleValidacion = (id) => {
    setIdSelected(id);
    setModalVisible(true);
  };
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  return (
    <View style={styles.container}>
      <ValidadorEliminar
        modalVisible={modalVisible}
        funcion={handleEliminar}
        setModalVisible={setModalVisible}
        idSelected={idSelected}
      />
      <ScrollView>
        <View style={{ margin: 5, padding: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Programacion: {nombreProgra}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View
            style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
          >
            <Picker
              selectedValue={dia}
              onValueChange={(itemValue, itemIndex) => setDia(itemValue)}
            >
              {diasSemana.map((dia, index) => (
                <Picker.Item key={index} label={dia} value={dia} />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Hora inicio"
            value={hora_inicio}
            onChangeText={(text) => setHora_inicio(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Hora fin"
            value={hora_fin}
            onChangeText={(text) => setHora_fin(text)}
          />

          <View
            style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
          >
            <Picker
              selectedValue={tipoID}
              onValueChange={(itemValue, itemIndex) => setTipoId(itemValue)}
            >
              {map(tipos, (tipo) => (
                <Picker.Item
                  key={tipo.id}
                  label={tipo.attributes.nombre}
                  value={tipo.id}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{ borderColor: "gray", borderWidth: 1, marginBottom: 8 }}
          >
            <Picker
              selectedValue={responsableID}
              onValueChange={(itemValue, itemIndex) =>
                setResponsableId(itemValue)
              }
            >
              {map(responsables, (responsable) => (
                <Picker.Item
                  key={responsable.id}
                  label={responsable.attributes.nombres}
                  value={responsable.id}
                />
              ))}
            </Picker>
          </View>

          <Button
            color="#4CAF50"
            title={editing ? "Editar" : "Agregar Horario"}
            onPress={register}
          />
        </View>
        {loading ? (
          <Loading />
        ) : (
          <View>
            {map(horarios, (horario) => (
              <View style={styles.tarjeta} key={horario.id}>
                <Text style={{ fontWeight: "bold" }}>
                  {horario.attributes.dia}
                </Text>
                <Text>Hora inicio: {horario.attributes.hora_inicio}</Text>
                <Text>Hora fin: {horario.attributes.hora_fin}</Text>
                <Text>
                  Actividad:
                  {(horario.attributes.tipo_procedimiento &&
                    horario.attributes.tipo_procedimiento.data &&
                    horario.attributes.tipo_procedimiento.data.attributes
                      .nombre) ||
                    ""}
                </Text>
                {/* <Text>
                  Programacion:
                  {(horario.attributes.programacion &&
                    horario.attributes.programacion.data &&
                    horario.attributes.programacion.data.attributes.nombre +
                      " " +
                      horario.attributes.programacion.data.attributes
                        .fecha_inicio +
                      " a " +
                      horario.attributes.programacion.data.attributes
                        .fecha_fin) ||
                    ""}
                </Text> */}
                <Text>
                  Responsable:
                  {(horario.attributes.responsable &&
                    horario.attributes.responsable.data &&
                    horario.attributes.responsable.data.attributes.nombres +
                      " " +
                      horario.attributes.responsable.data.attributes
                        .apellidos) ||
                    ""}
                </Text>
                <View style={styles.botonesContainer}>
                  <TouchableOpacity
                    style={styles.botonEditar}
                    onPress={() =>
                      handleEditar(
                        horario.id,

                        horario.attributes.hora_inicio,
                        horario.attributes.hora_fin
                      )
                    }
                  >
                    <Text style={styles.botonTexto}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botonEliminar}>
                    <Text
                      style={styles.botonTexto}
                      onPress={() => handleValidacion(horario.id)}
                    >
                      Eliminar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botonHorario}
                    onPress={() =>
                      goToActividades(horario.id, horario.attributes.dia)
                    }
                  >
                    <Text style={styles.botonTexto}>Actividad</Text>
                  </TouchableOpacity>
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
});
