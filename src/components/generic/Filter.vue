<template>
  <v-menu
    :close-on-content-click="false"
    min-width="500px"
    max-width="600px"
    width="350px"
  >
    <template #activator="{ props }">
      <v-btn color="primary" dark v-bind="props" icon="mdi-filter"> </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "Filter",
};
</script>
