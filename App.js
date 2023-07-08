import { StyleSheet, Text, View, Modal } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import Cabecera from "./screens/menu/Cabecera";
import AppNavigation from "./navigation/appNavigation";

import AuthContext from "./screens/loguin/AuthContext";
import Auth from "./screens/loguin/Auth";
import { setTokenApi, getTokenApi, removeTokeapi } from "./api/token";
import jwtDecode from "jwt-decode";
import { useEffect, useMemo, useState } from "react";
export default function App() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    (async () => {
      const token = await getTokenApi();
      console.log(token);
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []);
  const login = (user) => {
    console.log("Login APP.js");
    console.log(user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id,
    });
  };

  const logout = () => {
    if (auth) {
      removeTokeapi();
      setAuth(null);
    }
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );
  //if (auth === undefined) return null;
  return (
    // <NavigationContainer>
    //   <View style={styles.container}>
    //     {/* <StatusBar style="dark" backgroundColor={colors.primary} /> */}

    //     <Cabecera />
    //     {/* <AppNavigation tipo={auth} /> */}
    //     <AppNavigation />
    //   </View>
    // </NavigationContainer>
    <NavigationContainer>
      <View style={styles.container}>
        <Cabecera />
        {auth ? (
          <AppNavigation tipo={auth} />
        ) : (
          <Modal visible={true} onRequestClose={() => {}}>
            {/* Aquí puedes colocar el componente o contenido del modal */}
            <View style={styles.modalContainer}>
              {/* Contenido del modal */}
              <Auth />
            </View>
          </Modal>
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
