<template>
  <v-content>
    <v-container fluid fill-height justify-center align-center>
      <transition name="fade" mode="out-in">
        <v-col sm8 md6 lg4>
          <v-card>
            <v-toolbar dark color="primary" flat>
              <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <login-form @success="success"></login-form>
            </v-card-text>
          </v-card>
        </v-col>
      </transition>
    </v-container>
  </v-content>
</template>

<script>
import LoginForm from "./LoginForm";

export default {
  components: {
    LoginForm,
  },

  methods: {
    async success(data, remember = false) {
      // Save the token.
      this.$store.dispatch("auth/saveToken", {
        token: data.token,
        remember: remember,
      });
      await this.$store.dispatch("auth/setUser");
      this.$router.push({ path: "/" });
    },
  },
};
</script>
