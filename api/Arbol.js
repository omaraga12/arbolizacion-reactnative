import { API_URL } from "../api/Constants";
export async function getArboles() {
  try {
    const url = `${API_URL}/api/arbols?populate=*`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getArbolesByID(id) {
  try {
    const url = `${API_URL}/api/arbols/${id}?populate=*`;
    //console.log(url);
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function RegisterArboles(
  descripcion,
  coor_latitud,
  coor_longitud,
  especie,
  zona,
  user,
  foto,
  fecha_nacimiento,
  token,
  familia
) {
  try {
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        descripcion: descripcion,
        coor_latitud: coor_latitud,
        coor_longitud: coor_longitud,
        especie: especie,
        zona: zona,
        users_permissions_user: user,
        fecha_nacimiento: fecha_nacimiento,
        familia: familia,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(API_URL + "/api/arbols", requestOptions);
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

export async function ActualizarArboles(
  id,
  descripcion,
  coor_latitud,
  coor_longitud,
  especie,
  zona,
  user,
  foto,
  fecha_nacimiento,
  token,
  familia
) {
  try {
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        descripcion: descripcion,
        coor_latitud: coor_latitud,
        coor_longitud: coor_longitud,
        especie: especie,
        zona: zona,
        users_permissions_user: user,
        fecha_nacimiento: fecha_nacimiento,
        familia: familia,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(API_URL + "/api/arbols/" + id, requestOptions);
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

export async function EliminarArboles(
  id,

  token
) {
  try {
    var requestOptions = {
      method: "DELETE",

      redirect: "follow",
    };

    const response = await fetch(API_URL + "/api/arbols/" + id, requestOptions);

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
