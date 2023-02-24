<template>
  <v-card>
    <v-card-title>
      <slot></slot>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
        append-icon="mdi-magnify"
      ></v-text-field>

      <v-btn-toggle group mandatory>
        <v-btn @click="setNoDense">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn @click="setDense">
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-data-table :headers="headers" :dense="dense" :items="items" :search="search">
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ServiceTable",
  props: {
    headers: Array,
    items: Array
  },
  data() {
    return {
      dense: false,
      search: "",
    };
  },
  
  methods: {
    setNoDense() {
      this.dense = false;
    },
    setDense() {
      this.dense = true;
    }
  }
};
</script>