<template>
  <material-form :title="$t('institutions.form_name')">
    <v-form ref="form">
      <v-container py-0>
        <v-row wrap>
          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-text-field
              v-model="form.name"
              :label="$t('institutions.fields.name')"
              :rules="
                rules.required('El nombre de la institución es requerido')
              "
            />
          </v-col>

          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-autocomplete
              v-model="form.province"
              :items="provinces"
              :label="$t('institutions.fields.province')"
            />
          </v-col>

          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-text-field
              v-model="form.organism"
              :label="$t('institutions.fields.organism')"
              :rules="rules.required('El nombre del organismo es requerido')"
            />
          </v-col>

          <v-col xs="12" sm="12" md="12" lg="12" xl="12" cols="12">
            <v-textarea
              v-model="form.description"
              :label="`${$t('institutions.fields.description')} (opcional)`"
              outlined
              auto-grow
            />
          </v-col>

          <slot />
        </v-row>
      </v-container>
    </v-form>
  </material-form>
</template>

<script>
import { required } from "@/utils/rules";

export default {
  name: "InstitutionForm",
  props: {
    value: {
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
        return this.value;
      },
      set(form) {
        this.$emit("input", form);
      },
    },
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
