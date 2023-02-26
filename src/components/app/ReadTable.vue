<template>
  <v-container :fluid="true">
    <h4>{{ serviceName }}</h4>

    <v-data-table
      v-model="selectedRow"
      :headers="visibleHeaders"
      :items="tableData"
      :loading="false"
      :dense="isDense"
      :footer-props="{
        'items-per-page-text': 'Lecturas por páginas',
        'items-per-page-all-text': 'Todos',
      }"
      loading-text="Cargando Lecturas..."
      v-model:page="filters.page"
      v-model:items-per-page="filters.limit"
      :server-items-length="dataTableFields.serverItemsLength"
      single-select
      show-select
    >
      <template #top>
        <app-read-toolbar
          v-model:visible-columns="visibleColumns"
          :column-defs="headers"
          v-model:dense="isDense"
          @plus-click="openFormForInsert"
          @edit-click="openFormForEdit"
        />
      </template>
    </v-data-table>
    <v-dialog v-model="readFormDialog" width="600">
      <app-read-form
        ref="form"
        v-model="form"
        :loading="loading"
        @closure-submit="submitRead"
        @cloose-click="readFormDialog = false"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import qs from "query-string";

import { mapState, mapActions } from "vuex";

export default {
  name: "ReadTable",
  props: {
    // The purpose of this id is to get the reads related to it
    serviceIdForReads: {
      type: Number,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      selectedRow: [],
      isDense: false,
      pagination: true,
      itemsPerPage: 10,
      pageAmounts: [10, 50, 100],
      reads: [],
      dataTableFields: {
        serverItemsLength: -1,
      },
      filters: {
        page: 1,
        limit: 10,
      },
      visibleColumns: [
        "T1IAE",
        "T2IAE",
        "T3IAE",
        "TIRE",
        "T1IMAXD",
        "T2IMAXD",
        "T3IMAXD",
        "date",
      ],

      readFormDialog: false,
      isFormUpdating: false,
      form: {
        T1IAE: "",
        T2IAE: "",
        T3IAE: "",
        TIRE: "",
        T1IMAXD: "",
        T2IMAXD: "",
        T3IMAXD: "",
        date: "",
      },
    };
  },
  computed: {
    ...mapState("read", ["serviceId", "services", "servicesImportantData"]),
    tableData() {
      return this.reads.map((row) => {
        const read = {
          date: row.date,
        };
        return Object.assign(read, row.reading);
      });
    },
    qsFilters() {
      return qs.stringify(this.filters);
    },
    serviceCodCli() {
      return this.servicesImportantData.find(
        (service) => service.id === this.serviceIdForReads
      ).codcli;
    },
    headers() {
      return [
        {
          text: `${this.$t("read.fields.peak")} (kWh)`,
          value: "T1IAE",
          checkboxSelection: true,
          //   value: 'TLMT1IAE'
        },
        {
          text: `${this.$t("read.fields.day")} (kWh)`,
          value: "T2IAE",
          //   value: 'TLMT2IAE'
        },
        {
          text: `${this.$t("read.fields.morning")} (kWh)`,
          value: "T3IAE",
          //   value: 'TLMT3IAE'
        },
        {
          text: `${this.$t("read.fields.reactive")} (kVAr)`,
          value: "TIRE",
          //   value: 'TLMTIRE'
        },
        {
          text: "MDP (kW)",
          value: "T1IMAXD",
          //   value: 'TLMTT1IMAXD'
        },
        {
          text: "MDD (kW)",
          value: "T2IMAXD",
          //   value: 'TLMTT2IMAXD'
        },
        {
          text: "MDM (kW)",
          value: "T3IMAXD",
          //   value: 'TLMTT3IMAXD'
        },
        {
          text: this.$t("read.fields.date"),
          value: "date",
        },
      ];
    },
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.visibleColumns.includes(header.value)
      );
    },
  },

  watch: {
    qsFilters() {
      this.fetchReadsByService(this.serviceIdForReads);
    },
  },
  mounted() {
    this.fetchReadsByService(this.serviceIdForReads);
  },
  methods: {
    ...mapActions("read", ["setFormData", "setServiceId", "clearFormData"]),
    ...mapActions("app", ["addNotification"]),
    openFormForInsert() {
      if (this.isFormUpdating) {
        this.$refs.form.reset();
        this.isFormUpdating = false;
      }
      this.readFormDialog = true;
    },
    openFormForEdit() {
      this.isFormUpdating = true;
      if (!this.selectedRow.length) {
        this.addNotification({
          message: this.$t("notifications.select_row_before_update"),
          color: "primary",
        });
        return;
      }
      const row = this.selectedRow[0];
      const formData = Object.assign({}, row);
      const formKeys = Object.keys(this.form);
      formKeys.forEach((key) => {
        this.form[key] = formData[key];
      });
      this.readFormDialog = true;
    },
    submitRead() {
      this.isFormUpdating ? this.updateRead() : this.insertRead();
    },
    async updateRead() {
      const url = `/api/v1/day_ending/${this.serviceIdForReads}`;
      this.loading = true;
      let data;
      try {
        const response = await axios.patch(url, this.form);
        data = response.data;
        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
        console.log(err);
      }
      this.loading = false;
      return data;
    },
    async insertRead() {
      const url = `/api/v1/day_ending/service/${this.serviceIdForReads}`;
      this.loading = true;
      let data;
      try {
        const response = await axios.post(url, this.form);
        data = response.data;
        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
        console.log(err);
      }

      this.loading = false;
      return data;
    },
    fetchReadsByService(id) {
      axios
        .get(`/api/v1/day_ending?service=${id}&${this.qsFilters}`)
        .then(({ data }) => {
          this.reads = data.data;
          this.dataTableFields.serverItemsLength = data.total;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
