<template>
  <gen-form @submit="() => $emit('submit')" ref="form">
    <v-text-field
      v-model="form.year"
      :rules="[rules.required(), rules.number()]"
      :label="$t('plans.year')"
    />

    <v-text-field
      v-model="form.total_plan"
      :rules="[rules.required(), rules.number()]"
      label="Total para el Año (kWh)"
    />

    <v-text-field
      v-model="form.january"
      label="Enero (kWh) (opcional)"
      :rules="[optionalFieldHelper([rules.number()])]"
    />

    <v-text-field
      v-model="form.february"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Febrero (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.march"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Marzo (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.april"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Abril (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.may"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Mayo (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.june"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Junio (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.july"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Julio (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.august"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Agosto (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.september"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Septiembre (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.october"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Octubre (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.november"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Noviembre (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.december"
      :rules="[optionalFieldHelper([rules.number()])]"
      label="Diciembre (kWh) (opcional)"
    />
  </gen-form>
</template>

<script>
import { required, number } from "@/utils/rules";

import { optionalFieldHelper } from "@/utils/rules";

export default {
  name: "PlanForm",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      optionalFieldHelper,
      rules: {
        required,
        number,
      },
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    async validate() {
      await this.$refs.form.validate();
    },
  },
};
</script>
