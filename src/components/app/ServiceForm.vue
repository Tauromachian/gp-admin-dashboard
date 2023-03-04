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
      :label="$t('services.fields.exclusive')"
    />
    <v-text-field v-model="form.crf" label="CRF" :rules="[rules.required()]" />

    <v-text-field
      v-model.number="form.demanda"
      :label="$t('services.fields.hired_demand') + ' (kW)'"
      :rules="[rules.required(), rules.number()]"
    />

    <v-col xs="12" cols="12" />

    <v-autocomplete
      v-model="form.tipo_tarifa"
      :label="$t('services.fields.tarif_type')"
      :items="tariffTypes"
      hide-no-data
      hide-details
    />

    <gen-button-group
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
      this.form.name = "";
      this.form.codcli = "";
      this.form.serviceTypeTransformer = "";
      this.form.serviceTypePay = "Pospago";
      this.form.crf = "";
      this.form.exclusivo = false;
      this.form.tipo_tarifa = "";
      this.form.turnos = 1;
      this.form.demanda = "";
      this.form.meter_no = "";
      this.form.alimentacion = "";
      this.form.metraje = "";
      this.form.capacidad = "";
      this.form.device_token = "";
      this.form.accepted_ip = null;
      this.$refs.form.resetValidation();
    },

    closeServiceCredentialsFormDialog() {
      this.serviceCredentialsFormDialog = false;
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
