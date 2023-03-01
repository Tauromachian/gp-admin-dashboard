<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "Departamento de Energía, UCLV",
    };
  },
};
</script>
