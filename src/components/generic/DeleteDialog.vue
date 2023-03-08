<template>
  <v-dialog v-model="dialogComputed" max-width="400">
    <v-card>
      <v-card-title>¿Está seguro de que desea borrar?</v-card-title>
      <v-card-text>
        La fila seleccionada será borrada de la tabla. Esta acción no se puede
        revertir.
      </v-card-text>

      <v-card-text>
        <v-spacer />

        <gen-form-actions
          enable-cancel
          @click:submit="acceptClicked"
          @click:cancel="dialogComputed = false"
          submit-button-title="Borrar"
          submit-button-color="error"
        ></gen-form-actions>
      </v-card-text>
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
      this.$emit("click:accept");
    },
  },
};
</script>
