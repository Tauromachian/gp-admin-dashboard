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

          <v-col md="6"></v-col>

          <div v-for="(field, index) in visibleFields" :key="index">
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="generalRules"
                :label="$t('plans.months.january') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="generalRules"
                :label="$t('plans.months.january') + '  (kWh)'"
              />
            </v-col>
            <v-col xs="12" sm="12" md="4">
              <v-text-field
                :rules="generalRules"
                :label="$t('plans.months.january') + '  (kWh)'"
              />
            </v-col>
          </div>
        </v-row>
      </v-container>
    </v-form>
    <slot name="form-actions" :planSubmit="createPlan" />
  </app-form>
</template>

<script>
import { mapState } from "pinia";
import { isNumber } from "~/helpers/regex";

export default {
  name: "ServiceForm",
  props: {
    visibleFields: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      generalRules: [
        (v) => !!v || "Llene este campo por favor",
        (v) => isNumber(v) || "Solo valores númericos permitidos aqui",
      ],
    };
  },
  computed: {
    ...mapState("app", ["services"]),
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
