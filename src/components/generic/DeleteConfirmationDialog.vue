<template>
  <span>
    <v-btn v-if="text" :color="color" @click="openDialog">
      {{ text }}
    </v-btn>

    <v-btn v-else :color="color" @click="openDialog">
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>

    <material-delete-dialog v-model="dialog" @accept-click="deleteRow" />
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    text: {
      type: String,
      default: ''
    },
    deleteDialogButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialog: {
      get () {
        return this.deleteDialogButton
      },
      set (val) {
        this.$emit('update:delete-dialog-button', val)
      }
    }
  },
  methods: {
    deleteRow () {
      this.dialog = false
      this.$emit('delete')
    },
    openDialog () {
      this.$emit('on-delete-button-clicked')
    }
  }
}
</script>
