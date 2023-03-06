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
export default {
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
};
</script>
