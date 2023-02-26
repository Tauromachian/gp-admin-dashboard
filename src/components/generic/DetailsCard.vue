<template>
  <v-card v-bind="$attrs">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-text
      v-if="item"
      :class="{ 'pl-0': noContentPadding, 'pr-0': noContentPadding }"
      class="pb-0"
    >
      <p
        v-for="(header, index) in headers"
        :key="index"
      >
        <span v-if="!(item[header.value] === null || item[header.value] === undefined)">
          {{ `${header.text}: ` }}
          <span class="item-value">{{ item[header.value] }}</span>
        </span>
      </p>
    </v-card-text>
    <v-card-actions class="pt-0">
      <slot />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DetailsCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    noContentPadding: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.item-value {
  color: #010e18;
}
</style>
