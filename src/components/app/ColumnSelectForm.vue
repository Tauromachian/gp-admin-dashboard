<template>
  <v-list flat>
    <v-subheader>Selecciona las columnas a mostrar</v-subheader>
    <v-list-item-group multiple v-model="visibleColumn">
      <v-list-item
        v-for="column in columns"
        :key="column.header"
        :value="column.field"
      >
        <template v-slot:default="{ active, toggle }">
          <v-list-item-action>
            <v-checkbox color="primary" @click="toggle" v-model="active"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ column.headerName }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "ColumnSelectForm",
  data: function() {
    return {};
  },
  props: {
    value: Array,
    columns: Array
  },
  computed: {
    hide: {
      get() {
        return this.column;
      }
    },
    visibleColumn: {
      get() {
        return this.value;
      },
      set(selection) {
        this.$emit("input", selection);
      }
    }
  }
};
</script>