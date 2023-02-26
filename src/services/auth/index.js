import axios from "axios";
import { AUTH_DIR } from "@/utils/constants";

export async function login(user) {
  const url = `${AUTH_DIR}auth/login`;
  const response = await axios.post(url, user);
  return response;
}

export async function register(user) {
  const url = `${AUTH_DIR}auth/signup`;
  const response = await axios.post(url, user);
  return response;
}
