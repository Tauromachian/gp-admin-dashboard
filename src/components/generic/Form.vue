<template>
  <v-card :elevation="0">
    <v-card-title class="pt-1">
      {{ title }}
      <v-divider class="primary mb-2" />
    </v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="onSubmit">
        <slot> </slot>
        <gen-form-actions
          class="pl-0 pr-0"
          :enable-cancel="enableCancel"
          @click:submit="onSubmit"
          @click:cancel="onCancel"
        />
      </v-form>
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
    enableCancel: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
    onCancel() {
      this.$emit("cancel");
    },
    async validate() {
      return await this.$refs.form.validate();
    },
  },
};
</script>

<style scoped></style>
