<template>
  <v-text-field
    v-model="nameComputed"
    :label="$t('institutions.fields.name')"
  />
</template>

<script>
export default {
  name: "InstitutionFilter",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  computed: {
    nameComputed: {
      get() {
        return this.name;
      },
      set(val) {
        this.$emit("update:name", val);
      },
    },
  },
};
</script>

<style></style>
