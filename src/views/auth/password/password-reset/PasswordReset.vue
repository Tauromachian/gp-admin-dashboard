<template>
  <v-card>
    <v-toolbar dark color="primary" flat>
      <v-toolbar-title>{{ $t($route.name) }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <p>{{ $t('choose_password') }}</p>

      <password-reset-form @success="success"></password-reset-form>
    </v-card-text>
  </v-card>
</template>

<script>
import PasswordResetForm from './PasswordResetForm'

export default {
	components: {
		PasswordResetForm
	},

	methods: {
		success(form) {
			this.$router.push({ name: 'login', query: {email: form.email} })
		}
	}
}
</script>
