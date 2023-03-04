<template>
  <v-form ref="form" :title="$t('services.form_name')">
    <v-text-field
      v-model="form.meter_no"
      :label="$t('services.fields.meter_number')"
      :rules="[rules.required(), rules.number()]"
    />
    <v-text-field
      v-model="form.name"
      :label="$t('services.fields.service_name')"
      :rules="[rules.required(), rules.sentence()]"
    />

    <gen-button-group
      class="mb-4"
      v-model="form.serviceTypePay"
      :label="$t('services.fields.service_type_by_payment_type')"
    >
      <v-btn value="Pospago">
        {{ $t("services.fields.pospay") }}
      </v-btn>
      <v-btn class="ml-0" value="Prepago">
        {{ $t("services.fields.prepay") }}
      </v-btn>
    </gen-button-group>

    <v-text-field
      v-model="form.codcli"
      :label="$t('services.fields.client_code')"
      :rules="[rules.required()]"
    />
    <v-switch
      v-model="form.exclusivo"
      color="primary"
      :label="$t('services.fields.exclusive')"
    />
    <v-text-field v-model="form.crf" label="CRF" :rules="[rules.required()]" />

    <v-text-field
      v-model.number="form.demanda"
      :label="$t('services.fields.hired_demand') + ' (kW)'"
      :rules="[rules.required(), rules.number()]"
    />

    <v-autocomplete
      class="mb-4"
      v-model="form.tipo_tarifa"
      :label="$t('services.fields.tarif_type')"
      :items="tariffTypes"
      hide-no-data
      hide-details
    />

    <gen-button-group
      class="mb-4"
      v-model="form.alimentacion"
      :label="$t('services.fields.alimentation')"
    >
      <v-btn class="ml-0" value="Simple">
        {{ $t("services.fields.alimentation_simple") }}
      </v-btn>
      <v-btn value="Doble">
        {{ $t("services.fields.alimentation_double") }}
      </v-btn>
    </gen-button-group>

    <gen-number-stepper
      v-model="form.turnos"
      show-number
      :min="1"
      :max="3"
      :label="$t('services.fields.turns')"
      :allow-number-editing="false"
    />
  </v-form>
</template>

<script>
import { required, number, sentence } from "@/utils/rules";
import { tariffTypes } from "@/utils/staticValues";

import { SERVICE_FORM } from "@/utils/formTemplates";

export default {
  name: "ServiceForm",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      loading: false,

      serviceId: null,
      tariffTypes,

      rules: {
        required,
        number,
        sentence,
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
    cleanForm() {
      this.form = {
        ...SERVICE_FORM,
      };

      this.$refs.form.resetValidation();
    },

    async handleStep() {
      return true;
    },

    async validate() {
      return await this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.v-subheader {
  height: inherit;
}
</style>
