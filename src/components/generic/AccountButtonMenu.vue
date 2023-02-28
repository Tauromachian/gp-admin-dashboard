<template>
  <v-menu
    absolute
    close-on-click
    close-on-content-click
    offset-y
    v-model="menu"
  >
    <template #activator>
      <v-btn icon class="toolbar-items" @click="menu = !menu">
        <v-icon> mdi-account </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="logout">
        <template #prepend>
          <v-icon>mdi-logout-variant</v-icon>
        </template>
        <v-list-item-title>{{ $t("button.user.logout") }}</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item :to="{ name: 'docs' }">
        <template #prepend>
          <v-icon>mdi-api</v-icon>
        </template>
        <v-list-item-title>{{ $t("route.docs") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "AccountButtonMenu",
  data() {
    return {
      menu: false,
    };
  },
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
