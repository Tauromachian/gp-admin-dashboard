<template>
  <v-main>
    <v-container fluid fill-height justify-center align-center>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "AuthWrapper",
  middleware: "guest",

  metaInfo() {
    return { title: this.$route.name };
  },
};
</script>
