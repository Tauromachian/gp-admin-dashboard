<template>
  <v-menu top class="hidden-md-and-up">
    <template #activator="{ props }">
      <v-btn
        color="blue darken-2"
        dark
        class="mb-9 z-index-100 perfectly-round-button hidden-md-and-up"
        fixed
        fab
        bottom
        right
        v-bind="props"
      >
        <v-icon> mdi-filter </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <app-read-service-filter v-model="selection" />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "ReadFilter",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    selection: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style></style>
