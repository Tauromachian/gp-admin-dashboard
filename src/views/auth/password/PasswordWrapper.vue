<template>
  <v-col sm7 md5 lg3>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-col>
</template>

<script>
export default {};
</script>
