<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props" v-on="on">
        <v-icon dark> mdi-filter-variant </v-icon>
      </v-btn>
    </template>
    <v-card class="pt-2 pb-2 pl-2 pr-2">
      <v-subheader class="height-24"> Select month and year range </v-subheader>
      <hr />
      <gen-month-and-year-picker v-model="startDateComputed" />
      <gen-month-and-year-picker v-model="finishDateComputed" />
      <v-btn text color="primary" @click="submit"> Ok </v-btn>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "TimePeriodFilterMenu",
  props: {
    startDate: {
      type: String,
      required: true,
    },
    finishDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    startDateComputed: {
      get() {
        return this.startDate;
      },
      set(val) {
        this.$emit("update:start-date", val);
      },
    },
    finishDateComputed: {
      get() {
        return this.finishDate;
      },
      set(val) {
        this.$emit("update:finish-date", val);
      },
    },
  },
  methods: {
    submit() {
      this.$emit("submit-date");
    },
  },
};
</script>

<style scoped>
.height-24 {
  height: 24px;
}
</style>
