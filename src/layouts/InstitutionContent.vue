<template>
  <div>
    <core-drawer :links="links" />

    <router-view />
  </div>
</template>

<script>
import CoreDrawer from "./Drawer.vue";

export default {
  name: "InstitutionContent",
  components: {
    CoreDrawer,
  },
  data() {
    return {
      links: [
        {
          to: { name: "institutions" },
          icon: "mdi-domain",
          text: "institutions.institution",
        },
        {
          to: { name: "services" },
          icon: "mdi-view-dashboard",
          text: "services.service",
        },
        {
          to: { name: "read" },
          icon: "mdi-chart-bar-stacked ",
          text: "route.read",
        },
        {
          to: { name: "plans" },
          icon: "mdi-chart-areaspline",
          text: "route.plans",
        },

        {
          to: { name: "documents" },
          icon: "mdi-book-open-variant",
          text: "route.documents",
        },
      ],
    };
  },
};
</script>

<style></style>
