<template>
  <gen-form ref="form" :title="$t('services.form_name')">
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
      :items="tarifTypes"
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

    <v-col md="12" />

    <gen-button-group
      v-model="form.metraje"
      :label="$t('services.fields.metraje')"
    >
      <v-btn class="ml-0" value="Alta"> Alta </v-btn>
      <v-btn value="Baja"> Baja </v-btn>
    </gen-button-group>
    <v-text-field
      v-model="capacityComputed"
      :label="$t('services.fields.capacity') + ' (kVA)'"
      :rules="[rules.required(), rules.number()]"
      :disabled="disableCapacityInput"
    />

    <v-autocomplete
      v-if="form.metraje === 'Baja'"
      v-model="serviceType"
      label="Tipo de servicio (Segun transformación)"
      :items="serviceTypes"
      hide-no-data
      hide-details
    />

    <div v-if="form.metraje === 'Baja'">
      <v-subheader class="pl-0">
        {{ $t("services.fields.transformers_amount") }}
      </v-subheader>

      <v-btn-toggle group class="test">
        <v-btn @click="transformerAmountMinusOne">
          <v-icon>mdi-minus</v-icon>
        </v-btn>

        <v-btn @click="transformerAmountPlusOne">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-col sm="12" md="12" class="pt-0 pb-0" />

    <app-transformer-form
      v-for="(transformer, i) in transformers"
      :key="i"
      :mono-phase="transformerCapacitiesMonoPhase.capacities"
      :three-phase="transformerCapacitiesThreePhase.capacities"
      v-model:type="transformer.type"
      v-model:capacity="transformer.capacity"
      @on-close-transformer="deleteTransformer(i)"
    />

    <v-btn
      class="mx-0 font-weight-light btn-test"
      color="primary"
      large
      @click="serviceCredentialsFormDialog = true"
    >
      {{ $t("services.fields.open_credentials_button") }}
    </v-btn>

    <v-dialog v-model="serviceCredentialsFormDialog" width="400">
      <service-user-form
        class-computed="ml-10 mr-10"
        @on-delete-credentials="deleteServiceCredentials"
        @click:submit="createServiceCredentials"
        @click:cancel="closeServiceCredentialsFormDialog"
      />
    </v-dialog>
  </gen-form>
</template>

<script>
import axios from "axios";

import { required, number, sentence } from "@/utils/rules";

import { deleteService, getService } from "@/services/app/service";

import ServiceUserForm from "@/components/app/ServiceUserForm.vue";

import { mapActions } from "pinia";

export default {
  name: "ServiceForm",
  components: {
    ServiceUserForm,
  },
  props: {
    codcli: {
      type: [Number, String],
      default: 0,
    },
    insertedSuccesfully: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      loading: false,
      form: {
        name: "",
        codcli: "",
        serviceTypeTransformer: "",
        serviceTypePay: "Pospago",
        crf: "",
        exclusivo: false,
        tipo_tarifa: "M1A",
        turnos: 1,
        demanda: "",
        meter_no: "",
        alimentacion: "",
        metraje: "",
        capacidad: this.capacityComputed,
        device_token: "",
        accepted_ip: null,
      },
      serviceCredentialsFormDialog: false,
      serviceId: null,
      serviceUserForm: {
        username: "",
        name: "",
        password: "",
        password_confirmation: "",
      },
      serviceType: "Monofásico 110 V",
      serviceTypes: [
        "Monofásico 110 V",
        "Monofásico 220 V",
        "Trifásico 220 V",
        "Trifásico 480 V",
      ],
      tarifTypes: ["A1", "B1", "M1A", "M1C", "M1D", "M3A", "M3B", "M4"],
      transformerCapacitiesMonoPhase: {
        type: "mono_phase",
        ids: [],
        capacities: [],
      },
      transformerCapacitiesThreePhase: {
        type: "three_phase",
        ids: [],
        capacities: [],
      },
      transformers: [],
      rules: {
        required,
        number,
        sentence,
      },
    };
  },
  computed: {
    metraje() {
      return this.form.metraje;
    },
    disableCapacityInput() {
      if (this.form.metraje === "Alta") {
        return false;
      } else {
        return true;
      }
    },
    capacityComputed: {
      get() {
        let capacidad = 0;
        if (this.transformers.length) {
          for (const { capacity } of this.transformers) {
            if (capacity !== "" && capacity) {
              capacidad += capacity;
            }
          }
          return capacidad;
        } else {
          return this.form.capacidad;
        }
      },
      set(val) {
        this.form.capacidad = val;
      },
    },
  },
  watch: {
    insertedSuccesfully(val) {
      if (this.insertedSuccesfully) {
        this.cleanForm();
        this.cleanServiceCredentialsForm();
        this.$emit("update:inserted-succesfully", false);
      }
    },
    codcli() {
      this.fillForm();
    },
    metraje(val) {
      if (val === "Alta") {
        this.transformers = [];
      }
    },
  },
  mounted() {
    this.fillData();
  },
  methods: {
    ...mapActions("service", ["setCredentialsFormData", "setHasSensitiveData"]),
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

    cleanServiceCredentialsForm() {
      this.serviceUserForm.name = "";
      this.serviceUserForm.username = "";
      this.serviceUserForm.password_confirmation = "";
      this.serviceUserForm.password_confirmation = "";
    },
    async deleteServiceCredentials() {
      if (!this.serviceId) return;

      try {
        await deleteService(this.serviceId);
      } catch (error) {
        return this.$emit("delete-unsuccesful");
      }

      this.$emit("delete-succesful");
    },

    createServiceCredentials(credentials) {
      this.loading = true;
      this.form.device_token = credentials.device_token;
      this.form.accepted_ip = credentials.accepted_ip;
      this.serviceUserForm.username = credentials.username;
      this.serviceUserForm.name = credentials.username;
      this.serviceUserForm.password = credentials.password;
      this.serviceUserForm.password_confirmation =
        credentials.password_confirmation;
      this.loading = false;
      this.serviceCredentialsFormDialog = false;
    },

    deleteTransformer(i) {
      this.transformers.splice(i, 1);
    },

    closeServiceCredentialsFormDialog() {
      this.serviceCredentialsFormDialog = false;
    },

    async fillData() {
      await this.fillTransformersData();
      if (this.codcli) {
        await this.fillForm();
      }
    },

    async fillForm() {
      const data = await getService(this.codcli);

      const transformers = data.transformers;

      for (let i = 0; i < transformers.length; i++) {
        this.transformers.push({
          type: transformers[i].type,
          capacity: transformers[i].capacity,
        });
      }

      this.form = { ...data };

      this.setCredentialsFormData({
        device_token: this.form.device_token,
        accepted_ip: this.form.accepted_ip,
        username: "",
        password: "",
        password_confirmation: "",
      });

      if (this.form.auth_id && this.codcli) {
        this.serviceId = this.form.id;
        this.setHasSensitiveData(true);
      }
    },

    transformerAmountMinusOne() {
      if (this.transformers.length > 0) {
        this.transformers.pop();
      }
    },
    transformerAmountPlusOne() {
      if (this.transformers.length < 3) {
        this.transformers.push({ type: "mono_phase", capacity: "" });
      }
    },
    validate: function () {
      return this.$refs.form.validate();
    },
    createService: function () {
      if (!this.validate()) {
        return;
      }
      if (this.transformers.length > 0) {
        this.form.transformers_ids = this.getTransformersId(this.transformers);
      }

      if (this.capacityComputed) {
        this.form.capacidad = this.capacityComputed;
      }

      const serviceUserForm = this.serviceUserForm.username
        ? this.serviceUserForm
        : null;

      this.$emit("service-submit", this.form, serviceUserForm);
    },

    getTransformersId(transformers) {
      let tranformersIdsString = "";
      for (let i = 0; i < transformers.length; i++) {
        if (this.getTransformerId(transformers[i])) {
          tranformersIdsString += this.getTransformerId(transformers[i]) + ",";
        }
      }
      return tranformersIdsString.slice(0, -1);
    },

    getTransformerId(transformer) {
      if (transformer.type === "mono") {
        const index = this.transformerCapacitiesMonoPhase.capacities.indexOf(
          transformer.capacity
        );
        return this.transformerCapacitiesMonoPhase.ids[index];
      } else {
        const index = this.transformerCapacitiesThreePhase.capacities.indexOf(
          transformer.capacity
        );
        return this.transformerCapacitiesThreePhase.ids[index];
      }
    },

    async fillTransformersData() {
      axios
        .get("/api/v1/transformer")
        .then((res) => {
          res.data.forEach((transformer) => {
            if (transformer.type === "mono") {
              this.transformerCapacitiesMonoPhase.ids.push(transformer.id);
              this.transformerCapacitiesMonoPhase.capacities.push(
                transformer.capacity
              );
            } else {
              this.transformerCapacitiesThreePhase.ids.push(transformer.id);
              this.transformerCapacitiesThreePhase.capacities.push(
                transformer.capacity
              );
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.v-subheader {
  height: inherit;
}
</style>
