<template>
  <div>
    <core-drawer :links="links" />

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'InstitutionContent',
  data () {
    return {
      links: [
        {
          to: { name: 'institutions' },
          icon: 'mdi-domain',
          text: 'institutions.institution'
        },
        {
          to: { name: 'services' },
          icon: 'mdi-view-dashboard',
          text: 'services.service'
        },
        {
          to: { name: 'read' },
          icon: 'mdi-chart-bar-stacked ',
          text: 'route.read'
        },
        // {
        //   to: '/plan-form',
        //   icon: 'mdi-clipboard-outline',
        //   text: 'route.plans'
        // },
        // {
        //   to: '/consumption',
        //   icon: 'mdi-chart-bar-stacked ',
        //   text: 'route.consumption'
        // },
        // {
        //   to: '/closure',
        //   icon: 'mdi-chart-bar-stacked ',
        //   text: 'route.closure'
        // },
        // {
        //   to: '/user-management',

        //   icon: 'mdi-account',
        //   text: 'route.user-management'
        // },
        // {
        //   to: '/monitorization',
        //   icon: 'mdi-progress-clock ',
        //   text: 'route.monitoring'
        // },
        // {
        //   to: '/onure',
        //   icon: 'mdi-home-analytics',
        //   text: 'route.onure'
        // },
        // {
        //   to: '/une',
        //   icon: 'mdi-flash',
        //   text: 'route.une'
        // },
        {
          to: { name: 'documents' },
          icon: 'mdi-book-open-variant',
          text: 'route.documents'
        }
      ]
    }
  }
}
</script>

<style>

</style>
