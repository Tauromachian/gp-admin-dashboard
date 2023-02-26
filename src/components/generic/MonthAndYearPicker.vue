<template>
  <v-menu
    ref="startMenu"
    v-model="startMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    v-model:return-value="monthAndYear"
    transition="scale-transition"
    min-width="290px"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="monthAndYear"
        class="mt-3"
        label="Start month and year"
        prepend-icon="mdi-calendar-range-outline "
        dense
        readonly
        outlined
        hide-details
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="monthAndYear" no-title scrollable type="month">
      <v-spacer />
      <v-btn text color="primary" @click="startMenu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="$refs.startMenu.save(monthAndYear)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "MonthAndYearPicker",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      startMenu: false,
    };
  },
  computed: {
    monthAndYear: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
