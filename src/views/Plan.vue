<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex>
        <v-card>
          <v-tabs color="transparent" slider-color="white" background-color="primary">
            <v-tabs-slider></v-tabs-slider>
            <v-tab class="mr-3">
              <v-icon class="mr-2">mdi-code-tags</v-icon>Administrar
            </v-tab>
            <v-tab class="mr-3">
              <v-icon class="mr-2">mdi-bug</v-icon>Crear
            </v-tab>
            <v-tab-item>
              <app-plans-table></app-plans-table>
            </v-tab-item>
            <v-tab-item>
              <app-plan-form class="ml-10 mr-10"></app-plan-form>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Service"
};
</script>