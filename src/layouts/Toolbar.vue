<template>
  <v-app-bar id="core-toolbar" app flat>
    <div class="ml-2" />
    <div v-if="isViewInstitution" class="dinamic-margin-left" />
    <v-app-bar-nav-icon v-else @click="toggleDrawer" />
    <v-toolbar-title v-if="windowWidth > 580">
      {{ $t("route." + $route.name) }}
    </v-toolbar-title>

    <v-spacer />

    <!-- <gen-route-wide-search /> -->

    <div class="mx-3" />

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

    <locale-dropdown />

    <gen-account-button-menu />

    <div class="mr-2" />
  </v-app-bar>
</template>

<script>
import LocaleDropdown from "./LocaleDropdown";

export default {
  name: "Toolbar",
  components: { LocaleDropdown },
  data: () => ({
    windowWidth: 600,
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One",
    ],
  }),
  computed: {
    isViewInstitution() {
      return this.$route.name === "institutions";
    },
  },
  mounted() {
    window.onresize = this.setWindowWidth;
  },
  methods: {
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
    toggleDrawer() {
      this.$emit("toggle-drawer");
    },
  },
};
</script>

<style scoped>
#core-toolbar a {
  text-decoration: none;
  background: #eee;
}
@media only screen and (max-width: 600px) {
  .dinamic-margin-left {
    margin-left: 0px;
  }
}

@media only screen and (min-width: 600px) {
  .dinamic-margin-left {
    margin-left: 0px;
  }
}

@media only screen and (min-width: 768px) {
  .dinamic-margin-left {
    margin-left: 100px;
  }
}
</style>
