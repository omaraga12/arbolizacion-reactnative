import { API_URL } from "../api/Constants";
export async function getProgramaciones() {
  try {
    const url = `${API_URL}/api/programacions`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function RegisterProgramacion(
  nombre,
  fecha_inicio,
  fecha_fin,
  token
) {
  try {
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        nombre: nombre,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/programacions",
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

export async function ActualizarProgramacion(
  id,
  nombre,
  fecha_inicio,
  fecha_fin,
  token
) {
  try {
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        nombre: nombre,
        fecha_inicio: fecha_inicio,
        fecha_fin: fecha_fin,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/programacions/" + id,
      requestOptions
    );
    const result = await response.text();

    if (response.ok) {
      // Registro exitoso
      console.log("Actualizado:", result);
      return 1;
    } else {
      // Error en el registro
      console.log("Error al actualizar:", result);
      return 0;
      throw new Error(result);
    }
  } catch (error) {
    console.log("Error en la solicitud de registro:", error);
    return 0;
    throw error;
  }
}

export async function EliminarProgramacion(
  id,

  token
) {
  try {
    var requestOptions = {
      method: "DELETE",

      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/programacions/" + id,
      requestOptions
    );

    const result = await response.text();

    if (response.ok) {
      // Registro exitoso
      console.log("Eliminado:", result);
      return 1;
    } else {
      // Error en el registro
      console.log("Error al eliminar:", result);
      return 0;
      throw new Error(result);
    }
  } catch (error) {
    console.log("Error en la solicitud de eliminar:", error);
    return 0;
    throw error;
  }
}
