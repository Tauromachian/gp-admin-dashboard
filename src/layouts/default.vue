<template>
  <v-main>
    <notifications-handler ref="notificationsHandler"></notifications-handler>

    <default-toolbar @toggle-drawer="toggleDrawer"></default-toolbar>

    <default-view></default-view>
  </v-main>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";
import { useAppStore } from "@/stores/app";

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

  data() {
    return {
      drawer: false,
    };
  },

  computed: {
    ...mapState(useNotificationsStore, ["notifications"]),
  },

  watch: {
    notifications(notifications) {
      if (!notifications) return;

      const lastNotification = notifications.at(-1);

      if (!lastNotification) return;

      this.$refs.notificationsHandler.addNotification(lastNotification);
    },
  },
  methods: {
    ...mapActions(useAppStore, ["toggleDrawer"]),
  },
};
</script>
