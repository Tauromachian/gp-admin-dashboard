// Utilities
import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    addNotification(notification) {
      if (!notification) return;

      this.notifications = [...this.notifications, notification];
    },
  },
});
