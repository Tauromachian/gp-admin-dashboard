<template>
  <div>
    <input v-model="searchComputed" v-smart-routes="routes" type="text" hidden>

    <v-autocomplete
      v-model="viewName"
      :search-input.sync="search"
      :label="$t('search') + '...'"
      append-icon="mdi-magnify"
      :items="items"
      hide-no-data
      hide-details
      @change="changeRoute"
    />
  </div>
</template>

<script>
export default {
  name: 'RouteWideSearch',
  data () {
    return {
      routes: [],
      viewName: {},
      search: ''
    }
  },
  computed: {
    searchComputed () {
      if (this.search === null) {
        return ''
      }
      return this.search
    },
    items () {
      return this.routes.map(route => {
        return {
          text: route.title,
          value: route.name
        }
      })
    }
  },
  methods: {
    changeRoute () {
      if (this.$route.name === this.viewName) {
        return
      }
      this.$router.push({ name: this.viewName })
    }
  }
}
</script>
