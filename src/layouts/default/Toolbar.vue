<template>
  <v-app-bar app id="core-toolbar" flat style="background: #eee">
    <div class="v-toolbar-title">
      <v-toolbar-title>
        <v-btn
          class="default v-btn--simple"
          dark
          icon
          @click="$root.$emit('drawer_btn_clicked')"
        >
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ $route.name }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex align-center layout py-2>
        <v-text-field
          class="mr-4 purple-input"
          :label="Buscar + '...'"
          hide-details
          color="purple"
        />
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        <v-menu left bottom offset-x offset-y>
          <template v-slot:activator="{ on }">
            <router-link v-ripple class="toolbar-items" to="/notifications">
              <v-badge color="error" :content="notifications.length" overlap>
                <v-icon v-on="on" color="tertiary">mdi-bell</v-icon>
              </v-badge>
            </router-link>
          </template>
          <v-list dense disabled>
            <v-list-item
              v-for="(notification, index) in notifications"
              :key="index"
            >
              <v-list-item-title>
                {{ notification }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu absolute close-on-click close-on-content-click offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon dark v-on="on">
              <v-icon color="primary">mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push({ path: '/user-profile' })">
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
// import { mapActions } from 'vuex';
import LocaleDropdown from "./LocaleDropdown";

export default {
  components: { LocaleDropdown },
  data: () => ({
    notifications: [
      "Mike, John responded to your email",
      "You have 5 new tasks",
      "You're now a friend with Andrew",
      "Another Notification",
      "Another One",
    ],
  }),

  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");

      // Redirect to login.
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
