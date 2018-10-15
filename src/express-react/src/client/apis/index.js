import axios from "axios";

export async function logout() {
  const res = await axios.get("/api/logout");
  return res.data;
}
