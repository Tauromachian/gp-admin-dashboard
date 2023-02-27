import { defineStore } from "pinia";

import { login } from "@/services/auth";
import { useNotificationsStore } from "./notifications";

const notificationsStore = useNotificationsStore();

export const useAuthStore = defineStore("app", {
  state: () => ({
    user: null,
    token: "",
  }),

  actions: {
    async setUser() {},
    async login(form) {
      try {
        const { data } = await login(form);
        this.token = data.token;
      } catch (error) {
        notificationsStore.addNotification({
          message: error.response.data.message,
          color: "error",
        });
      }
    },
    async logout() {},
  },
});