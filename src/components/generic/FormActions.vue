<template>
  <div class="d-flex flex-row-reverse w-100">
    <v-btn
      class="ml-1"
      color="primary"
      :loading="loadingButtons"
      :disabled="loadingButtons"
      @click="submitEvent"
    >
      {{ submitButtonTitle }}
    </v-btn>
    <v-btn
      v-if="enableCancel"
      color="primary"
      variant="text"
      :loading="loadingButtons"
      :disabled="loadingButtons"
      @click="cancelEvent"
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
      default: "Submit",
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
        this.submitEvent();
      }
    });
  },
  destroyed() {
    document.removeEventListener("keydown", this._keyListener);
  },
  methods: {
    submitEvent() {
      this.$emit("click:submit");
    },
    cancelEvent() {
      this.$emit("click:cancel");
    },
  },
};
</script>
