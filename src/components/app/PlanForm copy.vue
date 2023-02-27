<template>
  <app-form :title="$t('plans.form_title')">
    <v-form ref="form">
      <v-container py-0>
        <v-row wrap>
          <v-col xs="12" md="6">
            <v-text-field :label="$t('plans.year')" />
          </v-col>

          <v-col xs="12" sm="12" md="6">
            <v-text-field
              :rules="yearPlanRules"
              :label="$t('plans.year_total') + '    (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.january') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.february') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.march') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.april') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.may') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.june') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.jule') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.august') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.september') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.october') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.november') + '  (kWh)'"
            />
          </v-col>
          <v-col xs="12" sm="12" md="3">
            <v-text-field
              :rules="monthPlanRules"
              :label="$t('plans.months.december') + '  (kWh)'"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <slot name="form-actions" :planSubmit="createPlan" />
  </app-form>
</template>

<script>
import { mapState } from "pinia";
import { isNumber } from "~/helpers/regex";
import axios from "axios";
import { api } from "~/config";

export default {
  name: "ServiceForm",
  props: {
    insertedSuccesfully: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      form: {
        yearComputed: this.year,
        januaryComputed: this.january,
        februaryComputed: this.february,
        marchComputed: this.march,
        aprilComputed: this.april,
        mayComputed: this.may,
        juneComputed: this.june,
        juleComputed: this.jule,
        augustComputed: this.august,
        septemberComputed: this.september,
        octoberComputed: this.october,
        novemberComputed: this.november,
        decemberComputed: this.december,
      },
      alimentationSelect: "Simple",
      alimentationItems: ["Simple", "Doble"],
      metrageSelect: "Alta",
      metrageItems: ["Baja", "Alta"],
      serviceRules: [
        (v) => !!v || "Entre un servicio",
        (v) => isNumber(v) || "Por favor entre un numero aqui",
      ],
      yearPlanRules: [
        (v) => !!v || "Entre el total para el año",
        (v) => isNumber(v) || "Por favor entre un numero aqui",
      ],
      monthPlanRules: [
        (v) => !!v || "Entre el plan de este mes",
        (v) => isNumber(v) || "Por favor entre un numero aqui",
      ],
    };
  },
  computed: {
    ...mapState("app", ["services"]),
  },
  watch: {
    year: function (val) {
      this.yearComputed = val;
    },
    january: function (val) {
      this.januaryComputed = val;
    },
    february: function (val) {
      this.februaryComputed = val;
    },
    march: function (val) {
      this.marchComputed = val;
    },
    april: function (val) {
      this.aprilComputed = val;
    },
    may: function (val) {
      this.mayComputed = val;
    },
    june: function (val) {
      this.juneComputed = val;
    },
    jule: function (val) {
      this.juleComputed = val;
    },
    august: function (val) {
      this.augustComputed = val;
    },
    september: function (val) {
      this.septemberComputed = val;
    },
    october: function (val) {
      this.octoberComputed = val;
    },
    november: function (val) {
      this.novemberComputed = val;
    },
    december: function (val) {
      this.decemberComputed = val;
    },
  },
  methods: {
    validate: function () {
      this.$refs.form.validate();
    },
    cancel: function () {
      this.$emit("cancel");
    },
    createPlan: function () {
      if (!this.validate()) {
        return;
      }
      this.$emit("plan-submit", this.form);
    },
  },
};
</script>
