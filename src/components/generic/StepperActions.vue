<template>
  <div class="d-flex flex-row-reverse">
    <v-btn
      v-if="!isLastStep"
      color="primary"
      :disabled="disabled"
      :loading="disabled"
      @click="clickNext"
    >
      Siguiente
    </v-btn>

    <v-btn v-else @click="clickSubmit" :loading="disabled" color="primary">
      Insertar
    </v-btn>

    <v-btn
      v-if="!isFirstStep"
      :disabled="disabled"
      color="primary"
      variant="text"
      @click="clickPrevious"
      outlined
      class="mr-2"
      :loading="disabled"
    >
      Anterior
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "StepperActionButtons",

  props: {
    isLastStep: {
      type: Boolean,
      default: false,
    },
    isFirstStep: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickNext() {
      this.$emit("click:next");
    },
    clickPrevious() {
      this.$emit("click:previous");
    },
    clickSubmit() {
      this.$emit("click:submit");
    },
  },
};
</script>

<style></style>
