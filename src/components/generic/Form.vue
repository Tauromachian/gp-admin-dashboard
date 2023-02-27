<template>
  <v-card :elevation="0">
    <v-card-title class="pb-0 pl-5 pr-5">
      {{ title }}
    </v-card-title>
    <v-divider class="primary" />
    <v-card-text class="pb-0 pl-3 pr-3">
      <slot>
        <gen-form-actions
          class="pl-0 pr-0"
          :enable-cancel="enableCancelAction"
          @on-submit="submitClick"
          @on-cancel="cancelClick"
        />
      </slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Form",
  props: {
    title: {
      type: String,
      default: "Form",
    },
    enableCancelAction: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitClick() {
      this.$emit("submit-click");
    },
    cancelClick() {
      this.$emit("cancel-click");
    },
  },
};
</script>

<style scoped></style>
