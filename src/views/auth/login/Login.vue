<template>
  <div class="d-flex flex-column login-wrapper">
    <div class="d-flex px-16 py-2 mb-5">
      <img src="/logo.svg" />
    </div>

    <gen-form
      title="Login"
      ref="form"
      class="login-form"
      @submit="submit"
      elevation="1"
    >
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
  </div>
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
@media screen and (min-width: 500px) {
  .login-wrapper {
    margin-bottom: 1.3em;
  }
}

.login-form {
  max-width: 600px;
  min-width: 300px;
  max-height: 290px;
}

@media screen and (min-width: 500px) {
  .login-form {
    min-width: 400px;
  }
}
</style>
