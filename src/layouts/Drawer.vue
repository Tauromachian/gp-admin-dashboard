<template>
  <v-navigation-drawer v-model="internalDrawer" app :order="0">
    <v-list-item :prepend-avatar="logo" title="SGE"> </v-list-item>
    <v-list-item>
      <v-list-item-subtitle class="institution-name-styles">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider />

    <v-list nav color="primary">
      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        class="mt-3"
        :to="link.to"
      >
        <template #prepend>
          <v-icon>{{ link.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ $t(link.text) }} </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/app";

export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    logo: "/logo.png",
    navDrawer: false,
    mini: false,
  }),
  computed: {
    ...mapState(useAppStore, ["color", "subtitle", "drawer"]),
    internalDrawer: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.setDrawer(value);
      },
    },
  },
  methods: {
    ...mapActions(useAppStore, ["setDrawer"]),
  },
};
</script>

<style scoped>
.institution-name-styles {
  overflow: unset;
  text-overflow: unset;
  white-space: unset;
  color: white !important;
}
</style>
