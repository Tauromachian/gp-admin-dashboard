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
      :label="labels.email"
      v-model="form.email"
      type="email"
      :error-messages="errors.email"
      :rules="[rules.required('email')]"
      :disabled="loading"
      prepend-icon="mdi-mail"
    ></v-text-field>

    <v-layout class="mt-4 mx-0">
      <v-spacer></v-spacer>

      <v-btn
        text
        :disabled="loading"
        :to="{ name: 'login', query: { email: form.email } }"
        color="grey darken-2"
        exact
      >
        Back to login
      </v-btn>

      <v-btn
        type="submit"
        :loading="loading"
        :disabled="loading || !valid"
        color="primary"
        class="ml-4"
      >
        Get password
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: null,
      username: null,
    },
  }),

  methods: {},
};
</script>
