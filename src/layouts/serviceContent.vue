<template>
  <div>
    <core-drawer :links="links" />

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ServiceContent',
  data () {
    return {
      links: [
        {
          to: { name: 'services' },
          icon: 'mdi-view-dashboard',
          text: 'services.service'
        },
        {
          to: { name: 'oneRead' },
          icon: 'mdi-chart-bar-stacked ',
          text: 'route.read'
        }
      ]
    }
  }
}
</script>

<style>

</style>
