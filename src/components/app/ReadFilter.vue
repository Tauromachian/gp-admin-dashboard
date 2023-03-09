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
      <gen-date-picker v-model="filters.date" :range="true"></gen-date-picker>
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
        date: "",
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
