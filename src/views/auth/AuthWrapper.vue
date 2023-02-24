<template>
  <v-container fluid fill-height justify-center align-center>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-container>
</template>

<script>

export default {
  name: 'AuthWrapper',
  middleware: 'guest',

  metaInfo () {
    return { title: this.$t('route.' + this.$route.name) }
  }
}

</script>
