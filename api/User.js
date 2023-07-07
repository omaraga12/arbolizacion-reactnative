import { API_URL } from "../api/Constants";
export async function registerApi(dni, nombre, apellidos, correo, clave) {
  try {
    var formdata = new FormData();
    formdata.append("username", dni);
    formdata.append("dni", dni);
    formdata.append("nombre", nombre);
    formdata.append("apellidos", apellidos);
    formdata.append("email", correo);
    formdata.append("password", clave);
    formdata.append("tipo", "user");

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/auth/local/register",
      requestOptions
    );
    const result = await response.text();

    if (response.ok) {
      // Registro exitoso
      console.log("Usuario registrado:", result);
      return 1;
    } else {
      // Error en el registro
      console.log("Error al registrar el usuario:", result);
      return 0;
      throw new Error(result);
    }
  } catch (error) {
    console.log("Error en la solicitud de registro:", error);
    return 0;
    throw error;
  }
}
