<template>
  <div
    v-resize="onResize"
    class="details-sidebar"
    :style="{ height: height }"
    :class="{ 'complete-hide': allowDialog }"
  >
    <!-- Institution details -->
    <v-progress-circular
      v-if="loading"
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    />
    <v-sheet
      v-show="!allowDialog && !loading"
      class="institution-details-styles"
      :height="height"
    >
      <slot />
    </v-sheet>
    <v-dialog
      v-show="allowDialog"
      v-model="dialogComputed"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      modal
    >
      <v-toolbar class="mb-0" dark color="primary">
        <v-toolbar-title class="white--text">
          {{ toolbarTitle }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn icon dark @click="dialogComputed = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card>
        <slot />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DetailsSidebar',
  props: {
    allowDialog: {
      type: Boolean,
      default: false
    },
    dialog: {
      type: Boolean,
      default: false
    },
    toolbarTitle: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    dialogComputed: {
      get () {
        if (!this.allowDialog) return false
        return this.dialog
      },
      set (val) {
        this.$emit('update:dialog', val)
      }
    }
  },
  methods: {
    onResize () {
      this.isScreenSmall = window.innerWidth < 800
    }
  }
}
</script>

<style scoped>
.details-sidebar {
  position: sticky;
  top: 6em;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.institution-details-styles {
  background-color: transparent;
  height: inherit;
}

.v-sheet {
  width: inherit;
}

.complete-hide {
  height: 0 !important;
  width: 0;
}
</style>
