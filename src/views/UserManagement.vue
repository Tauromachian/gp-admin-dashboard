<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex>
        <v-card>
          <v-tabs color="transparent" slider-color="white" background-color="primary">
            <v-tab class="mr-3">
              <v-icon class="mr-2">mdi-bug</v-icon>Crear
            </v-tab>
            <v-tab class="mr-3">
              <v-icon class="mr-2">mdi-file-table</v-icon>Administrar
            </v-tab>
            <v-tab-item>
              <app-user-form class="ml-10 mr-10"></app-user-form>
            </v-tab-item>
            <v-tab-item>
              <app-service-table></app-service-table>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "UserManagement"
};
</script>