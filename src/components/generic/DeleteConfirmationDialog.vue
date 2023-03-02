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
      @click="onDeleteButtonClick"
    >
    </v-btn>

    <gen-delete-dialog v-model="dialog" @click:accept="deleteRow" />
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
    modelValue: {
      type: Boolean,
      default: false,
    },
    isAllowedToOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialog: {
      get() {
        if (!this.isAllowedToOpen) return false;
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    onDeleteButtonClick() {
      this.isAllowedToOpen && (this.dialog = true);

      this.$emit("click:delete-button");
    },
    deleteRow() {
      this.dialog = false;
      this.$emit("delete");
    },
  },
};
</script>
