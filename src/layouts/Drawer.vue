<template>
  <v-navigation-drawer v-model="navDrawer" app dark :color="color">
    <v-list-item :prepend-avatar="logo" title="SGE"> </v-list-item>
    <v-list-item>
      <v-list-item-subtitle class="institution-name-styles">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider />

    <v-list nav :color="color">
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

export default {
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
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
    ...mapState("app", ["color", "drawer", "subtitle"]),
  },
  watch: {
    async navDrawer(val) {
      await this.setDrawer({ drawer: val });
    },
  },
  mounted() {
    this.navDrawer = this.drawer === "true" || this.drawer === true;
    this.$root.$on("drawer_btn_clicked", () => {
      this.navDrawer = !this.navDrawer;
    });
  },
  methods: {
    ...mapActions("app", ["setDrawer"]),
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
