import { API_URL } from "../api/Constants";
export async function getEvaluaciones() {
  try {
    const url = `${API_URL}/api/estado-evolucions`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function RegisterEvaluaciones(nombre, descripcion, token) {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        nombre: nombre,
        descripcion: descripcion,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/estado-evolucions",
      requestOptions
    );
    const result = await response.text();

    if (response.ok) {
      // Registro exitoso
      console.log("registrado:", result);
      return 1;
    } else {
      // Error en el registro
      console.log("Error al registrar:", result);
      return 0;
      throw new Error(result);
    }
  } catch (error) {
    console.log("Error en la solicitud de registro:", error);
    return 0;
    throw error;
  }
}
