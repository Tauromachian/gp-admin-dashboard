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
        :class="{'position-right': right, 'position-left': left}"
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
// Utilities
import { mapMutations, mapState } from 'vuex'

export default {
  props: {
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    colors: ['primary', 'info', 'success', 'warning', 'danger']
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    color () {
      return this.$store.state.app.color
    }
  },

  methods: {
    ...mapMutations('app', ['setImage']),
    setColor (color) {
      this.$store.state.app.color = color
    }
  }
}
</script>

<style lang="scss" scoped>
.v-avatar,
.v-responsive {
  cursor: pointer;
}
.v-btn--fixed {
  background-color: rgba(black, 0.3) !important;
  padding: 0;
}

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
