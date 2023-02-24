<template>
  <v-navigation-drawer v-model="navDrawer" app dark :color="color" :mini-variant.sync="mini" @transitionend="handleChange">
    <v-list-item>
      <v-list-item-avatar color="white">
        <v-img :src="logo" height="34" contain />
      </v-list-item-avatar>
      <v-list-item-title class="title">SGE</v-list-item-title>
      <v-btn icon @click="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider />

    <v-list nav :color="color">
      <v-list-item class="mt-3" v-for="(link, i) in links" :key="i" :to="link.to" link>
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="link.text" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: "logo.png",
    navDrawer: false,
    mini: false,
    links: [
      {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Servicios"
      },
      {
        to: "/plan-form",
        icon: "mdi-clipboard-outline",
        text: "Planes"
      },
      {
        to: "/table-list",
        icon: "mdi-chart-bar-stacked ",
        text: "Consumos"
      },
      {
        to: "/user-management",

        icon: "mdi-account",
        text: "Gestion de Usuarios"
      },
      {
        to: "/monitorization",
        icon: "mdi-clock",
        text: "Monitorización"
      }
    ]
  }),
  created () {
    localStorage.drawer === "true" || localStorage.drawer === true ? this.navDrawer = true : this.navDrawer = false
  },
  mounted() {
    const self = this
    this.$root.$on('drawer_btn_clicked', function () {
      self.navDrawer = !self.navDrawer
    })
    if (localStorage.mini) {
      localStorage.mini === "true" ? this.mini = true : this.mini = false;
    }

  },
  methods: {
    handleChange (event) {
      this.$store.dispatch('app/setDrawer', {drawer: this.navDrawer})
    }
  },
  watch: {
    mini(toggleMini) {
      localStorage.mini = toggleMini;
    },
    // drawer(drawerStateToggled) {
    //   this.navDrawer = drawerStateToggled;
    // }
  },
  computed: {
    ...mapState("app", ["color"]),
  },
};
</script>
