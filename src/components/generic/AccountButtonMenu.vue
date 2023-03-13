<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn icon class="toolbar-items" v-bind="props">
        <v-icon> mdi-account </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <template #prepend>
          <v-icon icon="mdi-account"></v-icon>
        </template>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item @click="() => $emit('logout')">
        <template #prepend>
          <v-icon icon="mdi-logout-variant"></v-icon>
        </template>
        <v-list-item-title>{{ $t("button.user.logout") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "AccountButtonMenu",
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
