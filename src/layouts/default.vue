<template>
  <div>
    <material-notification
      v-model="notificationComputed.notification"
      :text="notificationComputed.message"
      :color="notificationComputed.color"
    />

    <core-toolbar />

    <core-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Default',
  computed: {
    ...mapState('app', ['notification']),
    notificationComputed: {
      get () {
        return this.notification
      },
      set (val) {
        this.setNotification(val)
      }
    }
  },
  methods: {
    ...mapActions('app', ['setNotification'])
  }
}
</script>
