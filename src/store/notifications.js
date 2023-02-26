// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    addNotification: (notification) => this.notifications.push(notification),
  },
});
