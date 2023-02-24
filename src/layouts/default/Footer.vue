<template>
  <v-footer id="core-footer" absolute height="82">
    <div class="footer-items">
      <span v-for="link in links" :key="link.name">
        <a :href="link.Link" class="footer-links">
          <v-icon class="pb-2" color="primary" v-if="link.icon">{{ link.icon }}</v-icon>
          <span>{{ link.name }}</span>
        </a>
      </span>
    </div>
    <v-spacer />
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      Hecho con
      <v-icon color="success" size="17">mdi-heart</v-icon>para un planeta verde
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [{ name: "Home", Link: "/#", icon: "mdi-home" }]
  })
};
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
