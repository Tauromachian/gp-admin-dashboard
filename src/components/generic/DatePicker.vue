<template>
  <vue-date-picker v-model="date" :enable-time-picker="false">
    <template #trigger>
      <v-text-field label="Fecha" v-model="date" readonly> </v-text-field>
    </template>
    <template #action-row="{ selectDate }">
      <gen-form-actions @click:submit="selectDate"></gen-form-actions>
    </template>
  </vue-date-picker>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "DatePicker",
  components: {
    VueDatePicker,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  computed: {
    date: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", this.formatDate(val));
      },
    },
  },
  methods: {
    formatDate(dateValue) {
      if (this.$attrs.range) {
        return this.formatRange(dateValue);
      }
      return this.formatSimpleDate(dateValue);
    },
    formatSimpleDate(date) {
      return new Date(date).toLocaleDateString("es", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      });
    },
    formatRange(dateRange) {
      return dateRange.reduce((accumulator, date) => {
        return `${this.formatSimpleDate(accumulator)} ~ ${this.formatSimpleDate(
          date
        )}`;
      });
    },
  },
};
</script>
