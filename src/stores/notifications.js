// Utilities
import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    addNotification(notification) {
      this.notifications.push(notification);
    },
  },
});
