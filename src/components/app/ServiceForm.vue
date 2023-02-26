<template>
  <material-card
    color="primary"
    title="Formulario de servicio"
    text="Inserta un nuevo servicio"
  >
    <v-form ref="form">
      <v-container py-0>
        <v-layout wrap>
          <v-col xs12 md2>
            <v-text-field
              label="Numero del metro"
              v-model="meterNumber"
              :rules="meterNumberRules"
            />
          </v-col>
          <v-col xs12 md4>
            <v-text-field
              label="Nombre del Servicio"
              v-model="serviceName"
              :rules="serviceNameRules"
            />
          </v-col>

          <v-col xs12 md9>
            <material-button-group
              v-model="serviceTypeTransformer"
              label="Tipo de servicio (Segun transformación)"
            >
              <v-btn class="ml-0" value="Monofásico 110 V"
                >Monofásico 110 V</v-btn
              >
              <v-btn value="Monofásico 220 V">Monofásico 220 V</v-btn>
              <v-btn value="Trifásico 220 V">Trifásico 220 V</v-btn>
              <v-btn value="Trifásico 480 V">Trifásico 480 V</v-btn>
            </material-button-group>
          </v-col>

          <v-col xs12 md3>
            <material-button-group
              v-model="serviceTypePay"
              label="Tipo de servicio (Segun pago)"
            >
              <v-btn class="ml-0" value="Prepago">Prepago</v-btn>
              <v-btn value="Pospago">Pospago</v-btn>
            </material-button-group>
          </v-col>

          <v-col xs12 md3>
            <v-text-field
              label="Codigo del servicio"
              v-model="serviceCode"
              :rules="serviceCodeRules"
            />
          </v-col>
          <v-col xs6 md3 class="ml-0.5">
            <v-switch label="Exclusivo" v-model="exclusive" />
          </v-col>
          <v-col xs12 md3>
            <v-text-field label="CRF" v-model="crf" :rules="crfRules" />
          </v-col>

          <v-col xs12 md3>
            <v-text-field
              label="Demanda Contratada (kW)"
              v-model="hiredDemand"
              :rules="hiredDemandRules"
            />
          </v-col>

          <v-col xs12 md3>
            <material-button-group v-model="tarifType" label="Tipo de tarifa">
              <v-btn class="ml-0" value="B1">B1</v-btn>
              <v-btn value="M1-A">M1-A</v-btn>
              <v-btn value="M1-C">M1-C</v-btn>
            </material-button-group>
          </v-col>

          <v-col xs12 md3>
            <material-button-group v-model="alimentation" label="Alimentación">
              <v-btn class="ml-0" value="Simple">Simple</v-btn>
              <v-btn value="Doble">Doble</v-btn>
            </material-button-group>
          </v-col>

          <v-col xs6 md2>
            <v-subheader class="pl-0">Turnos de trabajo</v-subheader>
            <v-slider
              v-model="turn"
              :thumb-size="24"
              thumb-label="always"
              :max="3"
              :min="1"
            ></v-slider>
          </v-col>

          <v-col md12></v-col>

          <v-col xs12 md2>
            <material-button-group v-model="metrage" label="Metraje">
              <v-btn class="ml-0" value="Alta">Alta</v-btn>
              <v-btn value="Baja">Baja</v-btn>
            </material-button-group>
          </v-col>
          <v-col xs12 md4 v-if="metrage == 'Alta'">
            <v-text-field
              label="Capacidad (kVA)"
              v-model="capacity"
              :rules="capacityRules"
            />
          </v-col>
          <v-col xs12 md4 v-else>
            <v-subheader class="pl-0">Cantidad de transformadores</v-subheader>

            <v-slider
              v-model="transformersAmount"
              :thumb-size="24"
              thumb-label="always"
              :max="3"
              :min="1"
            ></v-slider>
          </v-col>

          <v-col md12 class="pt-0 pb-0"></v-col>

          <v-col xs12 md4 v-for="i in transformersAmount" :key="i">
            <app-transformer-form></app-transformer-form>
          </v-col>

          <v-col xs12 text-xs-right>
            <v-btn
              class="mx-0 font-weight-light btn-test"
              color="primary"
              @click="validate"
              >Insertar</v-btn
            >
          </v-col>
        </v-layout>
      </v-container>
    </v-form>
  </material-card>
</template>

<script>
import { isNumber, isLettersWithBlankSpaces } from "~/helpers/regex";

export default {
  name: "ServiceForm",
  data: function () {
    return {
      serviceName: "",
      serviceCode: "",
      serviceTypeTransformer: "",
      serviceTypePay: "",
      crf: "",
      exclusive: false,
      tarifType: "M1-A",
      turn: 1,
      hiredDemand: "",
      meterNumber: "",
      alimentation: "Simple",
      metrage: "Alta",
      capacity: "",
      transformersAmount: 0,
      serviceNameRules: [
        (v) => !!v || "El nombre del servicio falta",
        (v) => isLettersWithBlankSpaces(v) || "Caracteres no permitidos",
      ],
      serviceCodeRules: [(v) => !!v || "El codigo del servicio falta"],
      crfRules: [(v) => !!v || "El CRF falta"],
      hiredDemandRules: [
        (v) => !!v || "La demanda contratada falta",
        (v) => isNumber(v) || "La Demanda contratada es un numero",
      ],
      meterNumberRules: [
        (v) => !!v || "El numero del metro falta",
        (v) => isNumber(v) || "Introdujo al menos un caracter incorrecto aqui",
      ],
      capacityRules: [
        (v) => !!v || "La capacidad falta",
        (v) => isNumber(v) || "La capacidad es un numero",
      ],
    };
  },
  methods: {
    validate: function () {
      this.$refs.form.validate();
    },
  },
  watch: {
    metrage: function (val) {
      if (val === "Alta") {
        this.transformersAmount = 0;
      }
    },
    tarifType: function (val) {
      if (val === "B1") {
        this.exclusive = false;
      } else if (val === "M1-A") {
        this.exclusive = true;
      }
    },
  },
};
</script>
