<template>
  <div class="w-100 mt-10 notifications-handler">
    <gen-notification
      v-for="(notification, key) in messagesDirectory"
      class="notification"
      :key="key"
      :style="{ 'margin-top': `${index * 6}em` }"
      :notification="notification"
    ></gen-notification>
  </div>
</template>

<script>
import GenNotification from "./Notification.vue";

export default {
  name: "NotificationsHandler",
  components: {
    GenNotification,
  },

  data() {
    return {
      messagesDirectory: {},
    };
  },

  methods: {
    deleteMessageAfterDelay(id) {
      setTimeout(() => {
        this.deleteMessage(id);
      }, 5000);
    },

    deleteMessage(id) {
      delete this.messagesDirectory[id];
      this.messagesDirectory = { ...this.messagesDirectory };
    },

    addMessage(message) {
      const id = getRandomString();

      this.$set(this.messagesDirectory, id, message);

      this.deleteMessageAfterDelay(id);
    },
  },
};
</script>

<style scoped>
.notifications-handler {
  position: fixed;
  z-index: 1000;
}

.notification {
  position: absolute;
}
</style>
