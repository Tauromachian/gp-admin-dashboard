import axios from "axios";
import Cookies from "js-cookie";
import { api } from "~/config";
import * as types from "../mutation-types";

// Utilities
import { defineStore } from "pinia";

export const useAuthStore = defineStore("app", {
  state: () => ({
    user: null,
    token: Cookies.get("token"),
  }),

  actions: {
    async setUser() {},
    async logout() {},
  },
});
