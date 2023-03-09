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
      <v-card-title class="pt-1">
        {{ title }}
        <v-divider class="primary mb-2" />
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-text>
        <gen-form-actions></gen-form-actions>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "Filter",
  props: {
    title: {
      type: String,
      default: "Form",
    },
  },
};
</script>
