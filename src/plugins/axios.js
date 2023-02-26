import axios from "axios";
import store from "~/store/index";

const token = store.getters["auth/token"];

axios.interceptors.request.use(
  (config) => {
    config.headers["X-Requested-With"] = "XMLHttpRequest";

    if (token) {
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const locale = store.getters["lang/locale"];
    if (locale) {
      config.headers.common["Accept-Language"] = locale;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
