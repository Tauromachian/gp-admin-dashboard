<template>
  <app-form :title="$t('plans.form_title')">
    <v-form ref="form">
      <v-container py-0>
        <v-row wrap>
          <v-col xs="12" sm="12" md="6">
            <v-text-field :label="$t('plans.year')" />
          </v-col>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.january") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.february") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.march") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.april") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.may") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.june") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.jule") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.august") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.september") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.october") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.november") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12" sm="12" xs="12" class="pb-0">
              <v-subheader>{{ $t("plans.months.december") }}</v-subheader>
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.total_plan') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.night') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="planRules"
                :label="$t('plans.day') + '  (kWh)'"
              />
            </v-col>
          </v-row>

          <slot name="form-actions" :createPlan="createPlan" />
        </v-row>
      </v-container>
    </v-form>
  </app-form>
</template>

<script>
import { mapState } from "pinia";
import { isNumber } from "~/helpers/regex";
import axios from "axios";
import { api } from "~/config";

export default {
  name: "ServiceForm",
  data: function () {
    return {
      planRules: [
        (v) => !!v || "Entre el total para el mes",
        (v) => isNumber(v) || "Por favor entre un numero aqui",
      ],
    };
  },
  methods: {
    validate: function () {
      this.$refs.form.validate();
    },
    cancel: function () {
      this.$emit("on-cancel");
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
