// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    notifications: [],
    drawer: window.localStorage.getItem("drawer"),
    color: window.localStorage.getItem("color")
      ? window.localStorage.getItem("color")
      : "info",
    image: window.localStorage.getItem("image"),
    colorFormLabel: "#aaa",
    services: ["Planta piloto", "MFC"],
  }),

  actions: {
    addNotification: (notification) => this.notifications.push(notification),
    setDrawer: (drawer) => (this.drawer = drawer),
    setColor: (color) => (this.color = color),
    toggleDrawer: () => (this.drawer = !this.drawer),
  },
});
