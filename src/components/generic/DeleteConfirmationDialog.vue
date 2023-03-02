<template>
  <span>
    <v-btn v-if="text" :color="color" @click="openDialog">
      {{ text }}
    </v-btn>

    <v-btn
      icon="mdi-delete"
      variant="text"
      v-else
      :color="color"
      @click="() => (dialog = true)"
    >
    </v-btn>

    <gen-delete-dialog v-model="dialog" @accept-click="deleteRow" />
  </span>
</template>

<script>
export default {
  name: "DeleteConfirmationDialog",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      default: "",
    },
    deleteDialogButton: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.deleteDialogButton;
      },
      set(val) {
        this.$emit("update:delete-dialog-button", val);
      },
    },
  },
  methods: {
    deleteRow() {
      this.dialog = false;
      this.$emit("delete");
    },
  },
};
</script>
