<template>
  <v-dialog v-model="dialogComputed" max-width="400">
    <v-card>
      <v-card-title>¿Esta seguro de que desea borrar?</v-card-title>

      <v-card-actions>
        <v-spacer />

        <v-btn color="primary" text @click="acceptClicked">
          Aceptar
        </v-btn>

        <v-btn color="primary" text @click="dialogComputed = false">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
  props: {
    value: {
      type: [Boolean, String],
      required: true
    }
  },
  computed: {
    dialogComputed: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    acceptClicked () {
      this.$emit('accept-click')
    }
  }
}
</script>
