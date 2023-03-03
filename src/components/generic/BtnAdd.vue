<template>
  <v-btn
    class="mb-9 addition-button"
    dark
    color="primary"
    size="x-large"
    icon="mdi-plus"
    @click="openInsertForm"
    v-bind="$attrs"
  >
  </v-btn>
</template>

<script>
export default {
  name: "BtnAdd",
};
</script>

<style scoped>
.addition-button {
  position: fixed;
  bottom: 1em;
  right: 3em;
}
</style>
