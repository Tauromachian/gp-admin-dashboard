<template>
  <v-card :elevation="0">
    <v-card-title class="pt-3 px-5">
      {{ title }}
      <v-divider class="primary my-2" />
    </v-card-title>
    <v-card-text class="px-5 pt-0">
      <v-form ref="form" @submit.prevent="onSubmit">
        <slot> </slot>
        <slot name="actions">
          <gen-form-actions
            class="px-0"
            :enable-cancel="enableCancel"
            @click:submit="onSubmit"
            @click:cancel="onCancel"
          />
        </slot>
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
