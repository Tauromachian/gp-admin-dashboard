<template>
  <v-navigation-drawer v-model="navDrawer" app dark :color="color">
    <v-list-item>
      <v-list-item-avatar color="white">
        <v-img :src="logo" height="34" contain />
      </v-list-item-avatar>
      <v-list-item-title class="title">
        SGE
      </v-list-item-title>
    </v-list-item>
    <v-list-item>
      <v-list-item-subtitle class="institution-name-styles">
        {{ subtitle }}
      </v-list-item-subtitle>
    </v-list-item>

    <v-divider />

    <v-list nav :color="color">
      <v-list-item v-for="(link, i) in links" :key="i" class="mt-3" :to="link.to">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="$t(link.text)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    links: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    logo: '/logo.png',
    navDrawer: false,
    mini: false
  }),
  computed: {
    ...mapState('app', ['color', 'drawer', 'subtitle'])
  },
  watch: {
    async navDrawer (val) {
      await this.setDrawer({ drawer: val })
    }
  },
  mounted () {
    this.navDrawer = this.drawer === 'true' || this.drawer === true
    this.$root.$on('drawer_btn_clicked', () => {
      this.navDrawer = !this.navDrawer
    })
  },
  methods: {
    ...mapActions('app', ['setDrawer'])
  }

}
</script>

<style scoped>
.institution-name-styles {
    overflow: unset;
    text-overflow: unset;
    white-space: unset;
    color: white !important;
}
</style>
