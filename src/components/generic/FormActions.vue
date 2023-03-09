<template>
  <div class="d-flex flex-row-reverse w-100">
    <v-btn
      class="ml-1"
      :color="submitButtonColor"
      :loading="loadingButtons"
      :disabled="loadingButtons"
      @click="() => $emit('click:submit')"
    >
      {{ submitButtonTitle }}
    </v-btn>
    <v-btn
      v-if="enableCancel"
      color="primary"
      variant="text"
      :loading="loadingButtons"
      :disabled="loadingButtons"
      @click="() => $emit('click:cancel')"
    >
      {{ $t("button.actions.cancel") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "FormActions",
  props: {
    submitButtonTitle: {
      type: String,
      default: "Aceptar",
    },
    submitButtonColor: {
      type: String,
      default: "primary",
    },
    enableCancel: {
      type: Boolean,
      default: false,
    },
    loadingButtons: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.$emit("click:submit");
      }
    });
  },
  destroyed() {
    document.removeEventListener("keydown", this._keyListener);
  },
};
</script>
