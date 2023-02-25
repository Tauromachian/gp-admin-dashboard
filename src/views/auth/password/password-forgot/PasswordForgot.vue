<template>
  <v-card>
    <v-toolbar dark color="primary" flat>
      <v-toolbar-title>{{ $route.name }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <p>Introduzca email</p>

      <password-forgot-form @success="success"></password-forgot-form>
    </v-card-text>
  </v-card>
</template>

<script>
import PasswordForgotForm from "./PasswordForgotForm";

export default {
  components: {
    PasswordForgotForm,
  },

  methods: {
    success(data) {
      this.$router.push({ name: "login" });
    },
  },
};
</script>
