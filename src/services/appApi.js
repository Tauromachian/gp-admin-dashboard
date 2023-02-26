import { API_DIR } from "@/utils/constants";
import axios from "axios";

const appApi = axios.create({
  baseURL: API_DIR,
});

export function initAppApi(headers) {
  appApi.defaults.headers.common = { ...headers };
  return appApi;
}

export default appApi;
