<template>
  <v-snackbar :color="notification.color" right>
    {{ notification.text }}
    <v-icon size="16" @click="onClick"> mdi-close-circle </v-icon>
  </v-snackbar>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification: {
      type: Object,
      default: () => ({ color: "primary", text: "" }),
    },
  },

  methods: {
    onClick() {
      this.$emit("delete");
    },
  },
};
</script>
