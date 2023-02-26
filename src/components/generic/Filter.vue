<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition"
  >
    <template #activator="{ on }">
      <v-btn
        class="elevation-0"
        :class="{ 'position-right': right, 'position-left': left }"
        color="grey"
        dark
        fab
        fixed
        style="top: 96px"
        top
        left
        v-on="on"
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-xl>
        <slot />
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.position-right {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  right: 0;
}

.position-left {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  left: 0;
}
</style>
