<template>
  <gen-form :title="$t('institutions.coordinator_form_name')">
    <v-text-field
      v-model="name"
      :label="$t('institutions.fields.name')"
      :rules="noEmptyRule"
    />
    <v-text-field
      v-model="charge"
      :label="$t('institutions.fields.charge')"
      :rules="noEmptyRule"
    />
  </gen-form>
</template>

<script>
export default {
  name: "InstitutionCoordinatorForm",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: "",
      charge: "",
      noEmptyRule: [(v) => !!v || "Este campo no es opcional"],
    };
  },
  computed: {
    form: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    submitClick() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.form.name = this.name;
      this.form.charge = this.charge;
      this.$refs.form.reset();
      this.$emit("submit-click");
    },
    cancelClick() {
      this.$emit("cancel-click");
    },
  },
};
</script>

<style></style>
