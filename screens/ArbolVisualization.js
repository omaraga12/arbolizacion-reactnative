import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { getArboles } from "../api/Arbol";
import Loading from "../utils/Loading";
import { map } from "lodash";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function ArbolVisualization() {
  const [loading, setLoading] = useState(false);
  const [arboles, setArboles] = useState(null);
  const navigation = useNavigation();
  const fetch = async () => {
    setLoading(true);

    const [responseArboles] = await Promise.all([getArboles()]);
    setArboles(responseArboles.data);

    setLoading(false);
  };
  useEffect(() => {
    (async () => {
      fetch();
    })();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <MapView
          style={styles.map}
          // initialRegion={{
          //   latitude: -9.189967,
          //   longitude: -75.015152,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
        >
          {map(arboles, (item) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: item.attributes.coor_latitud,
                longitude: item.attributes.coor_longitud,
              }}
              title={item.attributes.descripcion}
              description={item.attributes.especie.data.attributes.nombre}
              onCalloutPress={() =>
                navigation.navigate("arbolEditing", { id: item.id })
              }
              // image={require("../assets/arbolicon.png")} // cambia esto a la ruta de tu ícono de árbol
            >
              <Image
                style={{ width: 60, height: 60 }} // Cambia los valores de width y height según tu preferencia
                source={require("../assets/arbolicon.png")}
              />
              <Callout>
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    {item.attributes.descripcion}
                  </Text>
                  <Text>{item.attributes.especie.data.attributes.nombre}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
