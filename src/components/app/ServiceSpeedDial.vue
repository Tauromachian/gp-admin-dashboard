<template>
  <v-speed-dial v-model="fab" fixed bottom right direction="top">
    <template #activator>
      <v-btn
        v-model="fab"
        color="blue darken-2"
        dark
        class="mb-9 z-index-100 perfectly-round-button"
        fab
      >
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-hand </v-icon>
      </v-btn>
    </template>
    <!-- Insert button -->
    <v-btn
      dark
      fab
      color="primary"
      class="perfectly-round-button"
      @click="clickPlus"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <!-- View menu button -->
    <v-menu top class="z-index-100" :close-on-content-click="false">
      <template #activator="{ attrs }">
        <v-btn
          dark
          fab
          color="primary"
          v-bind="attrs"
          class="perfectly-round-button"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          {{ $t("options") }}
        </v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-switch v-model="isTableActiveComputed" label="Table" />
          </div>
        </v-card-text>
      </v-card>
    </v-menu>

    <!-- View menu button -->
    <v-menu top class="z-index-100" :close-on-content-click="false">
      <template #activator="{ attrs }">
        <v-btn
          dark
          fab
          color="primary"
          v-bind="attrs"
          class="perfectly-round-button"
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>
      <v-card>
        <gen-form :title="$t('services.service_filter')">
          <v-text-field
            v-model="serviceNameComputed"
            :label="$t('institutions.fields.name')"
          />
        </gen-form>
      </v-card>
    </v-menu>
  </v-speed-dial>
</template>

<script>
export default {
  name: "ServiceSpeedDial",
  props: {
    serviceName: {
      type: String,
      default: "",
    },
    isTableActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fab: false,
    };
  },
  computed: {
    serviceNameComputed: {
      get() {
        return this.serviceName;
      },
      set(val) {
        this.$emit("update:serviceName", val);
      },
    },
    isTableActiveComputed: {
      get() {
        return this.isTableActive;
      },
      set(val) {
        this.$emit("update:isTableActive", val);
      },
    },
  },
  methods: {
    clickPlus() {
      this.$emit("click:plus");
    },
  },
};
</script>

<style></style>
