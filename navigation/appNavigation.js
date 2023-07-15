import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect } from "react";

import ArbolRegister from ".././screens/ArbolRegister";
import ArbolVisualization from ".././screens/ArbolVisualization";
import Especies from ".././screens/Especies";
import Evaluacion from ".././screens/Evaluacion";
import Familias from ".././screens/Familias";
import Responsables from ".././screens/Responsables";
import Tratamiento from ".././screens/Tratamiento";
import Zonas from ".././screens/Zonas";
import Loguin from "../screens/loguin/Auth";
import Logout from "../screens/loguin/Logout";
import Programacion from "../screens/Programacion";
import Horario from "../screens/Horario";
import { getTokenApi } from "../api/token";
import jwtDecode from "jwt-decode";
import { View } from "react-native";
import Actividad from "../screens/Actividad";
import ArbolEditing from "../screens/ArbolEditing";
export default function AppNavigation(props) {
  const Stack = createStackNavigator();
  const { tipo } = props;

  //------
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="arbolRegister"
        component={tipo === null ? Loguin : ArbolRegister}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArbolVisualization"
        component={ArbolVisualization}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Especies"
        component={Especies}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Evaluacion"
        component={Evaluacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Programacion"
        component={Programacion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Familias"
        component={Familias}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Responsables"
        component={Responsables}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Horarios"
        component={Horario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tratamiento"
        component={Tratamiento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Zonas"
        component={Zonas}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Actividad"
        component={Actividad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="logout"
        component={Logout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="arbolEditing"
        component={ArbolEditing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function AppNavigation2() {
  const Stack = createStackNavigator();

  //------
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="arbolRegister"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArbolVisualization"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Especies"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Evaluacion"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Familias"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Responsables"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tratamiento"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Zonas"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Loguin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="logout"
        component={Loguin}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
