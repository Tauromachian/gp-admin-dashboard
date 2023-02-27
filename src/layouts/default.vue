<template>
  <div>
    <gen-notification
      v-model="notificationComputed.notification"
      :text="notificationComputed.message"
      :color="notificationComputed.color"
    />

    <default-toolbar></default-toolbar>

    <default-view></default-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import DefaultToolbar from "./Toolbar.vue";
import DefaultView from "./View.vue";

export default {
  name: "Default",
  components: {
    DefaultToolbar,
    DefaultView,
  },
  computed: {
    ...mapState(useNotificationsStore, ["notification"]),
    notificationComputed: {
      get() {
        return this.notification;
      },
      set(val) {
        this.setNotification(val);
      },
    },
  },
  methods: {
    ...mapActions(useNotificationsStore, ["setNotification"]),
  },
};
</script>
