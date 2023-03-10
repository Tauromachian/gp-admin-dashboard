<template>
  <gen-form @submit="() => $emit('submit')" ref="form">
    <v-text-field
      v-model="form.year"
      :rules="[rules.required(), rules.number()]"
      :label="$t('plans.year')"
    />

    <v-text-field
      v-model="form.january"
      :rules="[rules.number()]"
      label="Total para el Año (kWh)"
    />

    <v-text-field
      v-model="form.february"
      :rules="[rules.number()]"
      label="Enero (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.march"
      :rules="[rules.number()]"
      label="Febrero (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.april"
      :rules="[rules.number()]"
      label="Marzo (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.may"
      :rules="[rules.number()]"
      label="Abril (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.june"
      :rules="[rules.number()]"
      label="Mayo (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.july"
      :rules="[rules.number()]"
      label="Junio (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.august"
      :rules="[rules.number()]"
      label="Julio (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.september"
      :rules="[rules.number()]"
      label="Agosto (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.january"
      :rules="[rules.number()]"
      label="Septiembre (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.october"
      :rules="[rules.number()]"
      label="Octubre (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.november"
      :rules="[rules.number()]"
      label="Noviembre (kWh) (opcional)"
    />

    <v-text-field
      v-model="form.december"
      :rules="[rules.number()]"
      label="Diciembre (kWh) (opcional)"
    />
  </gen-form>
</template>

<script>
import { required, number } from "@/utils/rules";

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
