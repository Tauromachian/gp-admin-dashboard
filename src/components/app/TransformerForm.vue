<template>
  <v-form elevation="0">
    <gen-button-group
      v-model="typeComputed"
      group
      mandatory
      color="primary"
      label="Tipo"
    >
      <v-btn value="mono"> Monofásico </v-btn>
      <v-btn value="three"> Trifásico </v-btn>
    </gen-button-group>

    <v-btn
      color="primary"
      dark
      small
      absolute
      top
      right
      fab
      @click="closeTransformer"
      icon="mdi-cancel"
    >
    </v-btn>
    <v-autocomplete
      v-model="capacityComputed"
      :items="capacities"
      label="Capacidad (kVA)"
      :rules="[rules.required(), rules.number()]"
    />
  </v-form>
</template>

<script>
import { required, number } from "@/utils/rules";

export default {
  name: "TransformerForm",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
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
      rules: { required, number },
    };
  },
  computed: {
    transformer: {
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
