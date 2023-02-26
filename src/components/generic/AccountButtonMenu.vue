<template>
  <v-menu
    absolute
    close-on-click
    close-on-content-click
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        class="toolbar-items"
        v-on="on"
      >
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
    </template>
    <v-list>
      <!-- <v-list-item :to="({ name: 'User Profile' })">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('button.user.profile') }}</v-list-item-title>
            </v-list-item> -->
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('button.user.logout') }}</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item :to="({name: 'docs'})">
        <v-list-item-icon>
          <v-icon>mdi-api</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('route.docs') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'AccountButtonMenu',
  methods: {
    async logout () {
      // Log out the user.
      await this.$store.dispatch('auth/logout')

      // Redirect to login.
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
