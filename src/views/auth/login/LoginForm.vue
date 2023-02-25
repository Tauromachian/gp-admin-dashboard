<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
      label="Nombre de usuario"
      v-model="form.username"
      type="email"
      :error-messages="errors.username"
      :rules="[rules.required('username')]"
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
      :error-messages="errors.password"
      :disabled="loading"
      :rules="[rules.required('password')]"
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

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
        class="ml-4"
      >
        Login
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
import axios from "axios/index";
import { api } from "~/config";
import Form from "~/mixins/form";

export default {
  mixins: [Form],

  data: () => ({
    loading: false,
    passwordHidden: true,

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
    submit() {
      const self = this;
      if (this.$refs.form.validate()) {
        self.loading = true;

        axios
          .post(api.path("login"), this.form)
          .then((res) => {
            this.$emit("success", res.data, self.remember);
            self.loading = false;
          })
          .catch((err) => {
            this.handleErrors(err.response.data.errors);
          });
      }
    },
  },
};
</script>
