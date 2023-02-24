<template>
  <v-menu
      absolute
      close-on-click
      close-on-content-click
      offset-y
  >
    <template v-slot:activator="{ on }">
      <v-btn
          icon
          dark
          v-on="on"
      >
        <v-icon color="primary">mdi-globe-model</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(value, key) in locales" :key="key" @click="setLocale(key)">
        <v-list-item-title>{{ $t(value) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadMessages } from '~/plugins/i18n'

export default {
  name: 'LocaleDropdown',

  computed: mapGetters({
    locale: 'lang/locale',
    locales: 'lang/locales'
  }),

  methods: {
    setLocale (locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale)

        this.$store.dispatch('lang/setLocale', { locale })
      }
    }
  }
}
</script>

<style scoped>

</style>