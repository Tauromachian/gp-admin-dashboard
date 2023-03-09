<template>
  <v-menu
    :close-on-content-click="false"
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    v-model="menu"
  >
    <template #activator="{ props }">
      <v-btn color="primary" dark v-bind="props" icon="mdi-filter"> </v-btn>
    </template>
    <v-card>
      <slot />
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "Filter",
  data() {
    return {
      menu: false,
    };
  },
};
</script>
