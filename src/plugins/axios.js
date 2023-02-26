import axios from "axios";
import store from "~/store/index";

const token = store.getters["auth/token"];

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (token) {
    }

    return Promise.reject(error);
  }
);
