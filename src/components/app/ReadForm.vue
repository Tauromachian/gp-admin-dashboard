<template>
  <gen-form :title="$t('read.form_name')">
    <v-form ref="form">
      <v-container py-0>
        <v-row wrap>
          <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
            <v-text-field
              v-model="form.T1IAE"
              :label="$t('closure.fields.peak') + ' (kWh)'"
              :rules="numberRules"
            />
          </v-col>
          <v-col xs="12" sm="12" md="4" lg="4" xl="4" cols="12">
            <v-text-field
              v-model="form.T2IAE"
              :label="$t('closure.fields.day') + ' (kWh)'"
              :rules="numberRules"
            />
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
            <v-text-field
              v-model="form.T3IAE"
              :label="$t('closure.fields.morning') + ' (kWh)'"
              :rules="numberRules"
            />
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
            <v-text-field
              v-model="form.TIRE"
              :label="$t('closure.fields.reactive') + ' (kVAr)'"
              :rules="numberRules"
            />
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
            <v-text-field
              v-model="form.T1IMAXD"
              label="MDP (kW)"
              :rules="numberRules"
            />
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
            <v-text-field
              v-model="form.T2IMAXD"
              label="MDD (kW)"
              :rules="numberRules"
            />
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
            <v-text-field
              v-model="form.T3IMAXD"
              label="MDM (kW)"
              :rules="numberRules"
            />
          </v-col>
          <v-col cols="12">
            <v-date-picker v-model="form.date" full-width color="primary" />
          </v-col>
          <slot name="form-actions" :closureSubmit="createClosure">
            <gen-form-actions
              :loading-buttons="loading"
              :enable-cancel="true"
              @on-submit="createClosure"
              @on-cancel="onCloseClick"
            />
          </slot>
        </v-row>
      </v-container>
    </v-form>
  </gen-form>
</template>

<script>
import { isNumber } from "~/helpers/regex";

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
    value: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      services: [],
      numberRules: [
        (v) => !!v || "Este campo no es opcional",
        (v) => isNumber(v) || "Ha introducido valores no validos",
      ],
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
  mounted() {
    this.initForm();
  },
  methods: {
    async initForm() {
      if (this.update) {
        this.fillForm();
      }
    },
    createClosure() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.$emit("closure-submit", this.form);
    },
    onCloseClick() {
      this.$emit("cloose-click");
    },
    fillForm() {
      const serviceId = this.$store.state.closure.serviceId;
      const serviceCodCli = this.getServiceCodCliById(serviceId);
      this.serviceCodCli = serviceCodCli;
      Object.assign(this.form, this.$store.state.closure.form);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
