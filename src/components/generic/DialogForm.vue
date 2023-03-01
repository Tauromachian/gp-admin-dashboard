<template>
  <v-dialog v-model="dialog">
    <gen-form v-bind="$attrs">
      <slot></slot>
    </gen-form>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogForm",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style></style>
