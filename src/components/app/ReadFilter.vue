<template>
  <gen-filter>
    <v-form>
      <div
        v-for="(field, index) in stepperFields"
        :key="`${field.value}-${index}`"
      >
        <p class="mb-8">{{ field.text }}</p>
        <v-range-slider
          :min="100"
          :max="10000000"
          :step="100"
          v-model="form[field.value]"
          thumb-label="always"
        >
        </v-range-slider>
      </div>
      <div class="d-flex flex-column">
        <p>Rango de fecha</p>
        <div class="d-flex">
          <v-text-field class="mr-1" label="Fecha inicial"></v-text-field>
          <v-text-field class="ml-1" label="Fecha final"></v-text-field>
        </div>
      </div>
    </v-form>
  </gen-filter>
</template>

<script>
export default {
  name: "ReadFilter",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      stepperFields: [
        { text: "Pico (kWh)", value: "pico" },
        { text: "Día (kWh)", value: "dia" },
        { text: "Madrugada (kWh)", value: "madrugada" },
        { text: "Reactivo (kVAr)", value: "reactivo" },
        { text: "MDP (kWh)", value: "mdp" },
        { text: "MDD (kWh)", value: "mdd" },
        { text: "MDM (kWh)", value: "mdm" },
      ],
    };
  },
  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>

<style></style>
