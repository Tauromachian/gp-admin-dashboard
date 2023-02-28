<template>
  <v-snackbar v-model="snackbar" :color="notification.color" right>
    {{ notification.text }}
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
    notification: {
      type: Object,
      default: () => ({ color: "primary", text: "" }),
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
