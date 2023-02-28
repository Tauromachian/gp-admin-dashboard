<template>
  <gen-form :title="$t('institutions.coordinator_form_name')">
    <v-form ref="form" class="pl-3 pr-3">
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
      <gen-form-actions
        class="pl-0 pr-0"
        enable-cancel
        @on-submit="submitClick"
        @on-cancel="cancelClick"
      />
    </v-form>
  </gen-form>
</template>

<script>
export default {
  name: "InstitutionCoordinatorForm",
  props: {
    value: {
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
        this.$emit("input", val);
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
