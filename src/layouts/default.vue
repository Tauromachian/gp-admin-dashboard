<template>
  <v-main>
    <notifications-handler ref="notificationsHandler"></notifications-handler>

    <core-drawer :links="links" />

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
import CoreDrawer from "./Drawer.vue";

export default {
  name: "Default",
  components: {
    DefaultToolbar,
    DefaultView,
    NotificationsHandler,
    CoreDrawer,
  },

  data() {
    return {
      drawer: false,
      links: [
        {
          to: { name: "institutions" },
          icon: "mdi-domain",
          text: "institutions.institution",
        },
        {
          to: { name: "services" },
          icon: "mdi-view-dashboard",
          text: "services.service",
        },
        {
          to: { name: "read" },
          icon: "mdi-chart-bar-stacked ",
          text: "route.read",
        },
        {
          to: { name: "plans" },
          icon: "mdi-chart-areaspline",
          text: "route.plans",
        },

        {
          to: { name: "documents" },
          icon: "mdi-book-open-variant",
          text: "route.documents",
        },
      ],
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
