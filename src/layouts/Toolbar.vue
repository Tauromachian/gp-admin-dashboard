<template>
  <v-app-bar id="core-toolbar" app flat :order="1">
    <v-app-bar-nav-icon @click="toggleDrawer" />

    <v-toolbar-title v-if="$vuetify.display.mdAndUp">
      {{ $t("route." + $route.name) }}
    </v-toolbar-title>

    <v-spacer />

    <!-- Right side icons -->
    <v-btn icon to="/">
      <v-icon> mdi-home </v-icon>
    </v-btn>

    <v-menu left bottom offset-x offset-y>
      <v-list dense>
        <v-list-item
          v-for="(notification, index) in notifications"
          :key="index"
        >
          <v-list-item-title>{{ notification }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          id="view-all-notifications"
          align="center"
          :to="{ name: 'notifications' }"
        >
          <v-list-item-title>
            {{ $t("button.view_all") }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon class="toolbar-items btn-toolbar-color" @click="toggleLanguage">
      <v-icon>mdi-translate</v-icon>
    </v-btn>

    <gen-account-button-menu @logout="logout" :user="user" />

    <div class="mr-2" />
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Toolbar",

  computed: {
    ...mapState(useAuthStore, ["user"]),
  },

  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },

    toggleLanguage() {
      this.$i18n.locale === "es"
        ? (this.$i18n.locale = "en")
        : (this.$i18n.locale = "es");
    },
  },
};
</script>
