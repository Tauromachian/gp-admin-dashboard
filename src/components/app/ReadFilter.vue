<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        color="primary"
        dark
        fixed
        fab
        bottom
        right
        v-bind="props"
        icon="mdi-filter"
      >
      </v-btn>
    </template>
    <v-card>
      <v-card-text> </v-card-text>
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
