<template>
  <v-dialog v-model="dialogComputed" max-width="400">
    <v-card>
      <v-card-title>¿Esta seguro de que desea borrar?</v-card-title>
      <v-card-subtitle>
        <div>Para borrar introduzca el siguiente texto:</div>
        <div>
          <span class="font-italic indigo lighten-5">
            {{ confirmationText }}
          </span>
        </div>
      </v-card-subtitle>

      <v-card-text>
        <v-text-field
          v-model="enteredConfirmationtext"
          :rules="confirmationRules"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <gen-form-actions
          @click:submit="acceptClicked"
          @click:cancel="dialogComputed = false"
        ></gen-form-actions>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialogComplex",
  props: {
    modelValue: {
      type: [Boolean, String],
      required: true,
    },
    confirmationText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      enteredConfirmationtext: "",
      isTextBadTyped: false,
      errorMessage: "",
      confirmationRules: [
        (v) =>
          v === this.confirmationText || this.$t("delete_dialog_error_message"),
      ],
    };
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
      if (this.confirmationText !== this.enteredConfirmationtext) {
        return;
      }
      this.$emit("accept-click");
    },
  },
};
</script>
