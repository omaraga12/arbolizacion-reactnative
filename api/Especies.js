import { API_URL } from "../api/Constants";
export async function getEspecies() {
  try {
    const url = `${API_URL}/api/especies`;
    const response = await fetch(url);
    const result = await response.json();
    //console.log(response);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
