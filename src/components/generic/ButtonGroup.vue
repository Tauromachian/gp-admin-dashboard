<template>
  <div class="mt-1">
    <v-subheader v-if="label" class="pl-0 pr-0 height-24">
      {{ label }}
    </v-subheader>
    <v-btn-toggle v-model="selection" group mandatory color="primary">
      <slot />
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    value: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  computed: {
    selection: {
      get() {
        return this.value;
      },
      set(selection) {
        this.$emit("input", selection);
      },
    },
  },
};
</script>

<style scoped>
.height-24 {
  height: 24px;
}
</style>
