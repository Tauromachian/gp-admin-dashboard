<template>
  <v-dialog v-model="dialogComputed" max-width="400">
    <v-card>
      <v-card-title>¿Esta seguro de que desea borrar?</v-card-title>
      <v-card-subtitle>
        <div>
          Para borrar introduzca el siguiente texto:
        </div>
        <div>
          <span class="font-italic indigo lighten-5">
            {{ confirmationText }}
          </span>
        </div>
      </v-card-subtitle>

      <v-card-text>
        <v-text-field
          v-model="enteredConfirmationtext"
          :rules="confirmationRules"
        />
      </v-card-text>

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
  name: 'DeleteDialogComplex',
  props: {
    value: {
      type: [Boolean, String],
      required: true
    },
    confirmationText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      enteredConfirmationtext: '',
      isTextBadTyped: false,
      errorMessage: '',
      confirmationRules: [
        v => v === this.confirmationText || this.$t('delete_dialog_error_message')
      ]
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
      if (this.confirmationText !== this.enteredConfirmationtext) {
        return
      }
      this.$emit('accept-click')
    }
  }
}
</script>
