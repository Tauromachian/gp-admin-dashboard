<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
      label="Contraseña"
      v-model="form.password"
      :append-icon="passwordHidden ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      @click:append="() => (passwordHidden = !passwordHidden)"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password"
      :disabled="loading"
      :rules="[rules.required('password')]"
      hint="At least 6 characters"
      @input="clearErrors('password')"
    ></v-text-field>

    <v-text-field
      label="Confirmar Contraseña"
      v-model="form.password_confirmation"
      :type="passwordHidden ? 'password' : 'text'"
      :error-messages="errors.password_confirmation"
      :disabled="loading"
      :rules="[rules.required('password_confirmation')]"
      @input="clearErrors('password')"
    ></v-text-field>

    <v-layout class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
      >
        Establecer contraseña
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
    passwordHidden: true,

    labels: {
      password: "New Password",
      password_confirmation: "Confirm New Password",
    },

    form: {
      token: null,
      email: null,
      username: null,
      password: null,
      password_confirmation: null,
    },
  }),

  created() {
    this.form.email = this.$route.query.email;
    this.form.username = this.$route.query.username;
    this.form.token = this.$route.params.token;
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        axios
          .post(api.path("password.reset"), this.form)
          .then((res) => {
            this.$emit("success", this.form);
          })
          .catch((err) => {
            this.handleErrors(err.response.data.errors);
          })
          .then(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
