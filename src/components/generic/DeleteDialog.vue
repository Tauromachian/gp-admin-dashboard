<template>
  <v-dialog v-model="dialogComputed" max-width="400">
    <v-card>
      <v-card-title>¿Esta seguro de que desea borrar?</v-card-title>

      <v-card-actions>
        <v-spacer />

        <gen-form-actions
          enable-cancel
          @click:submit="acceptClicked"
          @click:cancel="dialogComputed = false"
        ></gen-form-actions>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",
  props: {
    modelValue: {
      type: [Boolean, String],
      required: true,
    },
  },
  computed: {
    dialogComputed: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    acceptClicked() {
      this.$emit("accept-click");
    },
  },
};
</script>
