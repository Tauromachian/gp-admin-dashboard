<template>
  <div class="mt-1">
    <p v-if="label" class="pl-0 pr-0 height-24">
      {{ label }}
    </p>
    <v-btn-toggle v-model="selection" group mandatory color="primary">
      <slot />
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    modelValue: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  computed: {
    selection: {
      get() {
        return this.modelValue;
      },
      set(selection) {
        this.$emit("update:modelValue", selection);
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
