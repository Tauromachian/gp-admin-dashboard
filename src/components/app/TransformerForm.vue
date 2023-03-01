<template>
  <v-card elevation="0">
    <v-btn-toggle v-model="typeComputed" group mandatory color="primary">
      <v-btn value="mono"> Monofásico </v-btn>
      <v-btn value="three"> Trifásico </v-btn>
    </v-btn-toggle>
    <v-btn
      color="primary"
      dark
      small
      absolute
      top
      right
      fab
      @click="closeTransformer"
    >
      <v-icon>mdi-cancel</v-icon>
    </v-btn>
    <v-autocomplete
      v-model="capacityComputed"
      :items="capacities"
      label="Capacidad (kVA)"
      :rules="capacityRules"
    />
  </v-card>
</template>

<script>
import { isNumber } from "~/helpers/regex";

export default {
  name: "TransformerForm",
  props: {
    type: {
      type: String,
      default: "mono",
    },
    capacity: {
      type: [Number, String],
      default: "",
    },
    monoPhase: {
      type: Array,
      required: true,
    },
    threePhase: {
      type: Array,
      required: true,
    },
  },
  data: function () {
    return {
      capacities: this.type === "mono" ? this.monoPhase : this.threePhase,
      capacityRules: [
        (v) => !!v || "La capacidad falta",
        (v) => isNumber(v) || "Introduzca un numero aqui",
      ],
    };
  },
  computed: {
    capacityComputed: {
      get() {
        return this.capacity;
      },
      set(val) {
        return this.$emit("update:capacity", val);
      },
    },
    typeComputed: {
      get() {
        return this.type;
      },
      set(val) {
        return this.$emit("update:type", val);
      },
    },
  },
  watch: {
    type(val) {
      this.capacities = this.getArrayByType(val);
    },
  },
  methods: {
    getArrayByType(transformerType) {
      if (transformerType === "mono") {
        return this.monoPhase;
      } else {
        return this.threePhase;
      }
    },
    closeTransformer() {
      this.$emit("on-close-transformer");
    },
  },
};
</script>
