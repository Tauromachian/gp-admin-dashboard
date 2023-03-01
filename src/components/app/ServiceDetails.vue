<template>
  <v-scroll-y-transition mode="out-in">
    <div
      v-if="!service"
      class="title grey--text text--lighten-1 font-weight-light"
    >
      {{ $t("services.select_service_text") }}
    </div>
    <gen-details-card
      v-if="selectedService"
      :headers="headers"
      :item="selectedService"
      :title="$t('services.detail')"
      v-bind="$attrs"
    />
  </v-scroll-y-transition>
</template>

<script>
import { mapState } from "pinia";
import { useServiceStore } from "@/stores/service";

export default {
  name: "ServiceDetails",
  props: {
    service: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useServiceStore, { services: "tableData" }),
    selectedService() {
      const index = this.services.indexOf(this.service);
      const service = Object.assign({}, this.services[index]);
      return service;
    },
    headers() {
      return [
        {
          text: this.$t("services.table.headers.service_name"),
          value: "name",
        },
        {
          text: this.$t("services.table.headers.client_code"),
          value: "codcli",
        },
        {
          text: this.$t("services.table.headers.meter_number"),
          value: "meter_no",
        },
        {
          text: this.$t("services.table.headers.crf"),
          value: "crf",
        },
        {
          text: this.$t("services.table.headers.hired_demand"),
          value: "demanda",
        },
        {
          text: this.$t("services.table.headers.exclusive"),
          value: "exclusivo",
        },
        {
          text: this.$t("services.table.headers.metraje"),
          value: "metraje",
        },
        {
          text: this.$t("services.table.headers.capacity"),
          value: "capacidad",
        },
      ];
    },
  },
};
</script>

<style></style>
