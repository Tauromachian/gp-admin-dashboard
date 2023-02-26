<template>
  <v-speed-dial
    v-model="fab"
    v-bind="$attrs"
    class="common-speed-dial"
  >
    <template v-slot:activator>
      <v-btn
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon v-if="fab">
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-account-circle
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      v-if="enableEdit"
      fab
      dark
      small
      color="green"
      @click="insertClick"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      v-if="enableInsert"
      fab
      dark
      small
      color="indigo"
      @click="insertClick"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn
      v-if="enableDelete"
      fab
      dark
      small
      color="red"
      @click="deleteClick"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-btn
      v-if="enableFilter"
      fab
      dark
      small
      color="red"
      @click="filterClick"
    >
      <v-icon>mdi-filter</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'CommonSpeedDial',
  props: {
    enableInsert: {
      type: Boolean,
      default: true
    },
    enableEdit: {
      type: Boolean,
      default: true
    },
    enableDelete: {
      type: Boolean,
      default: true
    },
    enableFilter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      fab: false
    }
  },
  methods: {
    insertClick () {
      this.$emit('insert-click')
    },
    editClick () {
      this.$emit('edit-click')
    },
    deleteClick () {
      this.$emit('delete-click')
    },
    filterClick () {
      this.$emit('filter-click')
    }
  }
}
</script>

<style scoped>
.common-speed-dial > button {
  height: 64px !important;
  width: 64px !important;
  border-radius: 50%;
}
</style>
