// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    drawer: window.localStorage.getItem("drawer") === "true" ? true : false,
    color: window.localStorage.getItem("color")
      ? window.localStorage.getItem("color")
      : "info",
    image: window.localStorage.getItem("image"),
    colorFormLabel: "#aaa",
    services: ["Planta piloto", "MFC"],
  }),

  actions: {
    setDrawer(drawer) {
      this.drawer = drawer;
    },

    setColor(color) {
      this.color = color;
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
      window.localStorage.setItem("drawer", this.drawer);
    },
  },
});
