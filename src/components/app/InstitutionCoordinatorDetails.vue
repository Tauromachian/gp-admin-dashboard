<template>
  <v-card>
    <v-card-title> Coordinador </v-card-title>
    <v-card-title class="h5 mb-0 mt-0">
      Nombre: {{ coordinator.name }}
    </v-card-title>
    <v-card-title class="h5 mb-0 mt-0">
      Cargo: {{ coordinator.charge }}
    </v-card-title>
    <v-card-title class="h5 mb-0 mt-0">
      Teléfonos
    </v-card-title>
    <v-card-text v-for="(phone, key) in coordinator.phones" :key="'phone' + key" class="pb-0">
      {{ phone }}
    </v-card-text>
    <v-card-title class="h5 mb-0 mt-0">
      Emails
    </v-card-title>
    <v-card-text v-for="(email, key) in coordinator.emails" :key="'mail' + key" class="pb-0">
      {{ email }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'InstitutionCoordinatorDetails',
  props: {
    coordinator: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
