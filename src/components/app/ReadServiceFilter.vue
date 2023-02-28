<template>
  <v-treeview
    v-model="selection"
    :items="items"
    :load-children="setChildren"
    selection-type="leaf"
    selectable
    return-object
    open-all
  />
</template>

<script>
import { mapState } from "pinia";

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  name: "ReadServiceFilter",
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      children: [],
    };
  },
  computed: {
    ...mapState("read", { services: "servicesImportantData" }),
    items() {
      return [
        {
          id: 0,
          name: "Servicios",
          children: this.children,
        },
      ];
    },
    selection: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    async setChildren() {
      await pause(1000);

      const relevantData = this.services.map((service) => {
        return { name: service.name, id: service.id };
      });

      this.children.push(...relevantData);
    },
  },
};
</script>
