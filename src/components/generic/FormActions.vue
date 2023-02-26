<template>
  <div class="d-flex">
    <v-btn
      class="mx-0 font-weight-light btn-test"
      color="primary"
      :loading="loadingButtons"
      :disabled="loadingButtons"
      @click="submitEvent"
    >
      {{ submitButtonTitle }}
    </v-btn>
    <v-btn
      v-if="enableCancel"
      class="mx-0 font-weight-light btn-test ml-1"
      color="primary"
      text
      :loading="loadingButtons"
      :disabled="loadingButtons"
      @click="cancelEvent"
    >
      {{ $t("button.actions.cancel") }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'FormActions',
  props: {
    submitButtonTitle: {
      type: String,
      default: 'Submit'
    },
    enableCancel: {
      type: Boolean,
      default: false
    },
    loadingButtons: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.submitEvent()
      }
    })
  },
  destroyed () {
    document.removeEventListener('keydown', this._keyListener)
  },
  methods: {
    submitEvent () {
      this.$emit('on-submit')
    },
    cancelEvent () {
      this.$emit('on-cancel')
    }
  }
}
</script>
