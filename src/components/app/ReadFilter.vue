<template>
  <gen-filter title="Filtro de lecturas" @click:submit="submitFilters">
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
          v-model="filters[field.value]"
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
      filters: {
        page: 1,
        limit: 10,
        pico: [1, 5],
        dia: [1, 5],
        madrugada: [1, 5],
        reactivo: [1, 5],
        mdp: [1, 5],
        mdd: [1, 5],
        mdm: [1, 5],
      },
    };
  },
  methods: {
    submitFilters() {
      this.$emit("click:submit", this.filters);
    },
  },
};
</script>

<style></style>
