<template>
  <v-card class="login-form">
    <v-card-text>
      <gen-form title="Login" ref="form" @submit="submit">
        <v-text-field
          label="Nombre de usuario"
          v-model="form.username"
          type="email"
          :rules="[rules.required()]"
          :disabled="loading"
          prepend-icon="mdi-account"
        ></v-text-field>

        <v-text-field
          label="Contraseña"
          v-model="form.password"
          :append-icon="
            passwordHidden ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append="() => (passwordHidden = !passwordHidden)"
          :type="passwordHidden ? 'password' : 'text'"
          :disabled="loading"
          :rules="[rules.password()]"
          prepend-icon="mdi-lock"
        ></v-text-field>

        <template #actions>
          <div class="d-flex">
            <v-btn
              type="submit"
              :loading="loading"
              color="primary"
              class="ms-auto"
            >
              Login
            </v-btn>
          </div>
        </template>
      </gen-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { required, password } from "@/utils/rules";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export default {
  name: "Login",
  data: () => ({
    loading: false,
    passwordHidden: true,

    rules: {
      required,
      password,
    },

    form: {
      username: "",
      password: "",
    },

    remember: false,
  }),

  methods: {
    async submit() {
      if (!(await this.$refs.form.validate()).valid) return;

      this.loading = true;

      await authStore.login(this.form);

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 600px;
  min-width: 400px;
  max-height: 290px;
}
</style>
