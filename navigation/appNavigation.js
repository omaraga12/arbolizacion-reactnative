import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import ArbolRegister from ".././screens/ArbolRegister";
import ArbolVisualization from ".././screens/ArbolVisualization";
import Especies from ".././screens/Especies";
import Evaluacion from ".././screens/Evaluacion";
import Familias from ".././screens/Familias";
import Responsables from ".././screens/Responsables";
import Tratamiento from ".././screens/Tratamiento";
import Zonas from ".././screens/Zonas";
import Loguin from "../screens/loguin/Auth";

export default function AppNavigation() {
  const Stack = createStackNavigator();
  //LOGUIN

  //------
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="arbolRegister"
        component={ArbolRegister}
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
