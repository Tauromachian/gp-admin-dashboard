<template>
  <v-menu
    absolute
    close-on-click
    close-on-content-click
    offset-y
    v-model="menu"
  >
    <template #activator>
      <v-btn
        icon
        dark
        class="toolbar-items btn-toolbar-color"
        @click="menu = !menu"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(value, key) in $i18n.availableLocales"
        :key="key"
        @click="setLocale(value)"
      >
        <v-list-item-title>{{ $t(value) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "LocaleDropdown",
  data() {
    return {
      menu: false,
    };
  },

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style scoped></style>
