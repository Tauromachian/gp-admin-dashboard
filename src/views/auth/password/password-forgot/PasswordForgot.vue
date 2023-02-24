<template>
  <v-card>
    <v-toolbar dark color="primary" flat>
      <v-toolbar-title>{{ $t($route.name) }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <p>{{ $t('input_email_username') }}</p>

      <password-forgot-form @success="success"></password-forgot-form>
    </v-card-text>
  </v-card>
</template>

<script>
import PasswordForgotForm from './PasswordForgotForm'

export default {
  components: {
    PasswordForgotForm
  },

  methods: {
    success(data) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
