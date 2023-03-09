<template>
  <gen-form ref="form" :title="$t('read.form_name')">
    <v-text-field
      v-model="form.T1IAE"
      :label="$t('closure.fields.peak') + ' (kWh)'"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.T2IAE"
      :label="$t('closure.fields.day') + ' (kWh)'"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.T3IAE"
      :label="$t('closure.fields.morning') + ' (kWh)'"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.TIRE"
      :label="$t('closure.fields.reactive') + ' (kVAr)'"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.T1IMAXD"
      label="MDP (kW)"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.T2IMAXD"
      label="MDD (kW)"
      :rules="[rules.required(), rules.number()]"
    />

    <v-text-field
      v-model="form.T3IMAXD"
      label="MDM (kW)"
      :rules="[rules.required(), rules.number()]"
    />

    <v-date-picker v-model="form.date" full-width color="primary" />
  </gen-form>
</template>

<script>
import { required, number } from "@/utils/rules";

export default {
  name: "ReadForm",
  props: {
    update: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      services: [],
      rules: { required, number },
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },

  methods: {
    createClosure() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$emit("click:submit", this.form);
    },

    async validate() {
      return await this.$refs.form.validate();
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
