<template>
  <v-card color="primary" title="Plan anual" text="Inserta un nuevo plan">
    <v-form ref="form">
      <v-container py-0>
        <v-layout wrap>
          <v-col xs12 md6>
            <v-text-field label="Año" />
          </v-col>

          <v-col xs12 md6>
            <v-text-field
              :rules="yearPlanRules"
              label="Total para el Año (kWh)"
            />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Enero (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Febrero (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Marzo (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Abril (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Mayo (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Junio (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Julio (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Agosto (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Septiembre (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Octubre (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Noviembre (kWh)" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field :rules="monthPlanRules" label="Diciembre (kWh)" />
          </v-col>

          <v-col xs12 text-xs-right>
            <v-btn
              class="mx-0 font-weight-light"
              color="primary"
              @click="validate"
              >Insertar</v-btn
            >
          </v-col>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { isNumber } from "~/helpers/regex";

export default {
  name: "ServiceForm",
  data: function () {
    return {
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
  methods: {
    validate: function () {
      this.$refs.form.validate();
    },
  },
  computed: {
    ...mapState("app", ["services"]),
  },
};
</script>
