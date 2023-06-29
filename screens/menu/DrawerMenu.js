import React, { useState } from "react";

import close from "../../assets/close.png";
import { Searchbar } from "react-native-paper";
import {
  View,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";
import { IconButton } from "react-native-paper";
//import ListCategories from "../Components/Category/ListCategories";
const HomeIcon = () => <Icon name="home" />;
const TreeIcon = () => <Icon name="park" />;
const MapIcon = () => <Icon name="map" />;
const LeafIcon = () => <Icon name="grass" />;
const SpeciesIcon = () => <Icon name="spa" />;
const ZoneIcon = () => <Icon name="near-me" />;
const TestIcon = () => <Icon name="done" />;
const TryIcon = () => <Icon name="engineering" />;
const ResIcon = () => <Icon name="person" />;
const AccountIcon = () => <Icon name="account-circle" />;
const LogOutIcon = () => <Icon name="logout" />;
export default function DrawerMenu() {
  const [modalVisible, setModalVisible] = useState(true);
  const options = [
    {
      title: "Inicio",
      icon: <HomeIcon />,
    },
    {
      title: "Arbolización",
      icon: <TreeIcon />,
      subOptions: [
        {
          title: "Registro de árboles",
          icon: <TreeIcon />,
        },
        {
          title: "Visualización de mapa",
          icon: <MapIcon />,
        },
      ],
    },
    {
      title: "Mantenimiento",
      icon: <LeafIcon />,
      subOptions: [
        {
          title: "Familias",
          icon: <LeafIcon />,
        },
        {
          title: "Especies",
          icon: <SpeciesIcon />,
        },
        {
          title: "Zonas",
          icon: <ZoneIcon />,
        },
        {
          title: "Estados de evaluacion",
          icon: <TestIcon />,
        },
        {
          title: "Tipo de tratamiento",
          icon: <TryIcon />,
        },
        {
          title: "Responsables",
          icon: <ResIcon />,
        },
      ],
    },
    {
      title: "Mi cuenta",
      icon: <AccountIcon />,
      subOptions: [
        {
          title: "Cerrar sesion",
          icon: <LogOutIcon />,
        },
      ],
    },
  ];

  const renderOption = (option) => (
    <TouchableOpacity key={option.title} style={Styles.option}>
      {option.icon}
      <Text style={Styles.optionTitle}>{option.title}</Text>
    </TouchableOpacity>
  );

  const renderSubOptions = (subOptions) => (
    <View style={Styles.subOptionsContainer}>
      {subOptions.map((subOption) => (
        <TouchableOpacity key={subOption.title} style={Styles.subOption}>
          {subOption.icon}
          <Text style={Styles.subOptionTitle}>{subOption.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <View>
      <View>
        <IconButton
          icon={"menu"}
          color="#0000"
          size={50}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={Styles.container}>
          <View
            style={{
              height: 40,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={close}
                style={{ height: 25, width: 25, tintColor: "#000" }}
              />
            </TouchableOpacity>
          </View>

          <View style={Styles.container}>
            {options.map((option) => (
              <View key={option.title}>
                {renderOption(option)}
                {option.subOptions && renderSubOptions(option.subOptions)}
              </View>
            ))}
          </View>

          {/* <ListCategories setModalVisible={setModalVisible} /> */}
        </View>
      </Modal>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.OS === "web" ? 300 : "75%",
    backgroundColor: "#fff",
    //justifyContent: "center",
    //alignItems: "center",
    paddingHorizontal: 8,
  },
  search: {
    width: "95%",
    height: 50,
    resizeMode: "contain",
  },
  drawerContent: {
    paddingTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  optionTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  subOptionsContainer: {
    marginLeft: 24,
    marginTop: 8,
  },
  subOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subOptionTitle: {
    marginLeft: 8,
    fontSize: 18,
  },
});
