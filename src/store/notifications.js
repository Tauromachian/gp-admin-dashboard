// Utilities
import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("app", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    addNotification: (notification) => this.notifications.push(notification),
  },
});
