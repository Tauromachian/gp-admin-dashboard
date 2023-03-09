<template>
  <div class="w-100 mt-10 notifications-handler">
    <v-snackbar
      v-for="(notification, key, index) in notificationsDirectory"
      :key="key"
      :content-props="{
        style: {
          'margin-bottom': `${index * 4}em`,
          left: 'unset',
          right: '10px',
          bottom: '10px',
          transform: 'unset',
        },
      }"
      :color="notification.color"
      absolute
      close-on-content-click
      :modelValue="true"
      @update:modelValue="deleteNotification(key)"
    >
      {{ notification.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { getRandomString } from "@/utils/randomGenerator";

export default {
  name: "NotificationsHandler",

  data() {
    return {
      notificationsDirectory: {},
    };
  },

  methods: {
    deleteNotification(id) {
      delete this.notificationsDirectory[id];
      this.notificationsDirectory = { ...this.notificationsDirectory };
    },

    addNotification(notification) {
      if (!notification) return;

      const id = getRandomString();

      this.notificationsDirectory = {
        ...this.notificationsDirectory,
        [id]: notification,
      };
    },
  },
};
</script>

<style scoped>
.notifications-handler {
  position: fixed;
  z-index: 1000;
}
</style>
