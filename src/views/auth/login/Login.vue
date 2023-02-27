<template>
  <v-main>
    <v-container fluid fill-height justify-center align-center>
      <transition name="fade" mode="out-in">
        <v-col sm8 md6 lg4>
          <v-card class="login-form">
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
  </v-main>
</template>

<script>
import LoginForm from "./LoginForm";

export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-form {
  max-width: 600px;
  margin: auto;
}
</style>
