<template>
  <v-row>
    <h1 v-if="title">
      {{ title }}
    </h1>
    <v-col sm="5" md="4" cols="12">
      <v-date-picker v-model="month" type="month" />
    </v-col>
    <v-col sm="4" md="4" cols="12">
      <p v-for="(header, index) in headers" :key="index">
        {{ header.text }} : {{ item[header.value] }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
// Muestra datos segun el mes
// Los headers funcionan de igual manera que los de vuetify
export default {
  name: 'DetailsByMonth',
  props: {
    value: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: () => []
    }
  },
  computed: {
    month: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style>
</style>
