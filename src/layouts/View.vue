<template>
  <v-main>
    <div id="core-view">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
  </v-main>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: 'Departamento de Energía, UCLV'
    }
  }
}
</script>
