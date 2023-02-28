<template>
  <div>
    <notifications-handler ref="notificationsHandler"></notifications-handler>

    <default-toolbar></default-toolbar>

    <default-view></default-view>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import DefaultToolbar from "./Toolbar.vue";
import DefaultView from "./View.vue";
import NotificationsHandler from "@/components/generic/NotificationsHandler.vue";

export default {
  name: "Default",
  components: {
    DefaultToolbar,
    DefaultView,
    NotificationsHandler,
  },

  computed: {
    ...mapState(useNotificationsStore, ["notifications"]),
  },

  watch: {
    notifications(notifications) {
      if (!notifications) return;

      const lastNotification = notifications.at(-1);

      if (!lastNotification) return;

      this.$refs.notificationsHandler.addNotification(notification);
    },
  },
};
</script>
