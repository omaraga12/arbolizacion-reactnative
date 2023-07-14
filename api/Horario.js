import { API_URL } from "../api/Constants";
export async function getHorarios() {
  try {
    const url = `${API_URL}/api/horarios?populate=*`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getHorariosByProgramacion(id) {
  try {
    const url = `${API_URL}/api/horarios?filters[programacion]=${id}&populate=*`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function validarCruceHorrios(
  dia,
  hora_inicio,
  hora_fin,
  programacion
) {
  try {
    const url = `${API_URL}/api/horarios?filters[dia]=${dia}&filters[hora_inicio]=${hora_inicio}&filters[hora_fin]=${hora_fin}&filters[programacion]=${programacion}`;
    console.log(url);
    const response = await fetch(url);
    const result = await response.json();
    //console.log(result);

    if (result.data.length === 0) {
      return 0;
    } else {
      return 1;
    }
  } catch (error) {
    console.log(error);
    return 1;
  }
}

export async function RegisterHorarios(
  tipo_procedimiento,
  programacion,
  responsable,
  dia,
  hora_inicio,
  hora_fin,
  token
) {
  try {
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        dia: dia,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        programacion: programacion,
        responsable: responsable,
        tipo_procedimiento: tipo_procedimiento,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(API_URL + "/api/horarios", requestOptions);
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

export async function ActualizarHorarios(
  id,
  tipo_procedimiento,
  programacion,
  responsable,
  dia,
  hora_inicio,
  hora_fin,
  token
) {
  try {
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      data: {
        dia: dia,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        programacion: programacion,
        responsable: responsable,
        tipo_procedimiento: tipo_procedimiento,
      },
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/horarios/" + id,
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

export async function EliminarHorarios(
  id,

  token
) {
  try {
    var requestOptions = {
      method: "DELETE",

      redirect: "follow",
    };

    const response = await fetch(
      API_URL + "/api/horarios/" + id,
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
