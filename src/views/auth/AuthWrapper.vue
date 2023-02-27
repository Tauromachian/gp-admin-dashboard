<template>
  <v-main>
    <v-container
      fluid
      class="d-flex flex-column justify-center align-center h-screen"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
        <div class="mt-16"></div>
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
