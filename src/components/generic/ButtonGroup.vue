<template>
  <div>
    <label>{{ label }}</label>
    <v-btn-toggle group mandatory v-model="selection" color="primary">
      <slot></slot>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup",
  props: {
    value: String,
    label: String
  },
  computed: {
    selection: {
      get() {
        return this.value;
      },
      set(selection) {
        this.$emit("input", selection);
      }
    }
  }
};
</script>