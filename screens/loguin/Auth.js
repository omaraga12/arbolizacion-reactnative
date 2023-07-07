import React, { useState } from "react";
import Loguin from "./Loguin";
import Register from "./Register";
import { View } from "react-native";

export default function Auth() {
  const [tipo, setTipo] = useState(true);
  const changeForm = () => {
    setTipo(!tipo);
  };
  return (
    <View>
      {tipo ? (
        <Loguin changeForm={changeForm} />
      ) : (
        <Register changeForm={changeForm} />
      )}
    </View>
  );
}
