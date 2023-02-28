<template>
  <gen-form ref="form" :title="$t('institutions.form_name')" v-bind="$attrs">
    <v-text-field
      v-model="form.name"
      :label="$t('institutions.fields.name')"
      :rules="[rules.required('El nombre de la institución es requerido')]"
    />
    <v-autocomplete
      v-model="form.province"
      :items="provinces"
      :label="$t('institutions.fields.province')"
    />
    <v-text-field
      v-model="form.organism"
      :label="$t('institutions.fields.organism')"
      :rules="[rules.required('El nombre del organismo es requerido')]"
    />
    <v-textarea
      v-model="form.description"
      :label="`${$t('institutions.fields.description')} (opcional)`"
      outlined
      auto-grow
    />
  </gen-form>
</template>

<script>
import { required } from "@/utils/rules";

export default {
  name: "InstitutionForm",
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      provinces: [
        "Pinar del Río",
        "Artemisa",
        "La Habana",
        "Mayabeque",
        "Matanzas",
        "Cienfuegos",
        "Villa Clara",
        "Sancti Spíritus",
        "Ciego de Ávila",
        "Camagüey",
        "Las Tunas",
        "Granma",
        "Holguín",
        "Santiago de Cuba",
        "Guantánamo",
        "Isla de la Juventud",
      ],
      rules: {
        required,
      },
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(form) {
        this.$emit("update:modelValue", form);
      },
    },
  },
  methods: {
    async validate() {
      return await this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
