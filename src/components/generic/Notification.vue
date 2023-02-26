<template>
  <v-snackbar v-model="snackbar" :color="color" right>
    {{ text }}
    <v-icon size="16" @click="snackbar = false"> mdi-close-circle </v-icon>
  </v-snackbar>
</template>

<script>
export default {
  name: "Notification",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    snackbar: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
