<template>
  <div class="mt-1">
    <p class="mb-6">{{ label }}</p>
    <v-slider
      v-model="selectedValue"
      track-color="primary"
      show-ticks="always"
      tick-size="4"
      :step="1"
      v-bind="$attrs"
      thumb-label="always"
    >
      <template v-slot:prepend>
        <v-btn
          color="primary"
          size="small"
          variant="text"
          icon="mdi-minus"
          @click="decreaseValue"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          color="primary"
          size="small"
          variant="text"
          icon="mdi-plus"
          @click="increaseValue"
        ></v-btn>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  name: "NumberStepper",
  props: {
    modelValue: { type: [String, Number], default: 0 },
    label: { type: String, default: "" },
  },

  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },

  methods: {
    decreaseValue: function () {
      if (this.selectedValue > this.$attrs.min) {
        this.selectedValue--;
      }
    },
    increaseValue: function () {
      if (this.selectedValue < this.$attrs.max) {
        this.selectedValue++;
      }
    },
    notNumber(val) {
      return typeof val !== "number";
    },
  },
};
</script>

<style scoped>
.height-24 {
  height: 24px;
}
</style>
