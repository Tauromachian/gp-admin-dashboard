<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation>
    <v-text-field
      label="Nombre de usuario"
      v-model="form.username"
      type="email"
      :rules="[rules.required]"
      :disabled="loading"
      prepend-icon="mdi-account"
      @input="clearErrors('username')"
    ></v-text-field>

    <v-text-field
      label="Contraseña"
      v-model="form.password"
      :append-icon="passwordHidden ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append="() => (passwordHidden = !passwordHidden)"
      :type="passwordHidden ? 'password' : 'text'"
      :disabled="loading"
      :rules="[rules.password]"
      prepend-icon="mdi-lock"
      @input="clearErrors('password')"
    ></v-text-field>

    <v-layout class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'forgot_password', query: { email: form.email } }"
        color="grey darken-2"
      >
        ¿Olvidó la Contraseña?
      </v-btn>

      <v-btn type="submit" :loading="loading" color="primary" class="ml-4">
        Login
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import { login } from "@/services/auth";
import { required, password } from "@/utils/rules";

export default {
  data: () => ({
    loading: false,
    passwordHidden: true,

    rules: {
      required,
      password,
    },

    form: {
      username: null,
      password: null,
    },

    remember: false,
  }),

  created() {
    this.form.username = this.$route.query.username || null;
  },

  methods: {
    async submit() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      try {
        await login(this.form);
        this.$emit("success", res.data, this.remember);
      } catch (error) {
        this.handleErrors(err.response.data.errors);
      }

      this.loading = false;
    },
  },
};
</script>
