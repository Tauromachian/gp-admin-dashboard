<template>
  <div>
    <v-btn-toggle group mandatory v-model="transformerType" color="primary">
      <v-btn value="Monofásico">Monofásico</v-btn>
      <v-btn value="Trifásico">Trifásico</v-btn>
    </v-btn-toggle>
    <v-text-field label="Capacidad (kVA)" v-model="capacity" :rules="capacityRules" />
  </div>
</template>

<script>
import { isNumber } from "~/helpers/regex";

export default {
  name: "TransformerForm",
  data: function() {
    return {
      transformerType: "Monofásico",
      capacity: "",
      capacityRules: [
        v => !!v || "La capacidad falta",
        v => isNumber(v) || "Introduzca un numero aqui"
      ]
    }
  }
}
</script>