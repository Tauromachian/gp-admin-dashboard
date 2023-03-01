<template>
  <v-card>
    <v-card-text>
      <gen-toolbar
        v-model:visible-columns="visibleColumns"
        :column-defs="headers"
        v-model:delete-dialog-button="deleteDialogButton"
        @delete-row="deleteRow"
        @on-open-update-dialog="fillForm"
        @on-delete-button-clicked="openDeleteConfirmationDialog"
      >
        <service-form :codcli="codcli" @submit="serviceSubmit"> </service-form>
      </gen-toolbar>
      <easy-data-table
        class="mt-4"
        v-model="selectedRow"
        :headers="visibleHeaders"
        :items="tableData"
        :loading="false"
        :dense="isDense"
        v-model:items-per-page="itemsPerPage"
        loading-text="Cargando Servicios..."
        v-model:page="filters.page"
        single-select
        show-select
        @click:row="
          (item, row) => {
            seeDetails(item, true);
            setActiveRow(row);
          }
        "
      >
      </easy-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  deleteService,
  updateService,
  getService,
  addServiceCredentials,
} from "@/services/app/service";

import { mapActions, mapState } from "pinia";
import { useServiceStore } from "@/stores/service";
import { useNotificationsStore } from "@/stores/notifications";

import ServiceForm from "@/components/app/ServiceForm.vue";

export default {
  name: "ServiceTable",
  components: {
    ServiceForm,
  },
  data() {
    return {
      selectedRow: [],
      isDense: false,
      itemsPerPage: 10,
      deleteDialogButton: false,
      loading: false,
      dialog: false,
      serviceFormDialog: false,
      pagination: true,
      pageAmounts: [10, 50, 100],
      rowAmount: 10,
      rowHeight: 48,
      search: "",
      visibleColumns: [
        "name",
        "codcli",
        "meter_no",
        "crf",
        "demanda",
        "exclusivo",
        "metraje",
        "capacidad",
      ],
      codcli: {},
      filters: {
        page: 1,
      },
    };
  },
  computed: {
    ...mapState(useServiceStore, { services: "tableData" }),
    tableData() {
      return this.services;
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
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.visibleColumns.includes(header.value)
      );
    },
  },
  methods: {
    ...mapActions(useServiceStore, ["clearCredentialsFormData"]),
    ...mapActions(useNotificationsStore, ["addNotification"]),

    openDeleteConfirmationDialog() {
      if (!this.selectedRow.length) {
        this.addNotification({
          message: this.$t("notifications.select_row_before_delete"),
          color: "primary",
        });
        return;
      }
      this.deleteDialogButton = true;
    },

    async deleteRow() {
      const id = this.selectedRow[0].id;

      try {
        await deleteService(id);
        const index = this.services.indexOf(this.selectedRow[0]);
        this.services.splice(index, 1);
        this.addNotification({
          message: this.$t("notifications.successful_delete"),
          color: "success",
        });
      } catch (error) {
        this.addNotification({
          message: this.$t("notifications.error_at_delete"),
          color: "error",
        });
      }
      this.selectedRow = [];
    },
    fillForm(openUpdateDialog) {
      if (!this.selectedRow.length) {
        this.addNotification({
          message: this.$t("notifications.select_row_before_update"),
          color: "primary",
        });
        return;
      }

      this.codcli = this.selectedRow[0].codcli;

      openUpdateDialog();
    },
    async updateService(form, serviceCredentialsForm, closeUpdateDialog) {
      this.loading = true;

      const id = this.selectedRow[0].id;

      const patchServiceStatus = this.patchService(form, id);

      if (!patchServiceStatus) {
        this.loading = false;
        return;
      }

      const serviceCredentialsInsertionStatus =
        await this.insertServiceCredentials(
          serviceCredentialsForm,
          form.codcli
        );

      if (!serviceCredentialsInsertionStatus) {
        this.loading = false;
        return;
      }

      this.clearCredentialsFormData();

      const index = this.services.indexOf(this.selectedRow[0]);
      this.services.splice(index, 1, form);

      this.addNotification({
        message: this.$t("notifications.succesfull_update"),
        color: "success",
      });
      this.loading = false;
      closeUpdateDialog();
    },
    async patchService(form, id) {
      try {
        await updateService(id, form);
        return true;
      } catch (error) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_update"),
          color: "error",
        });
        return false;
      }
    },
    async insertServiceCredentials(serviceFormCredentials, codcli) {
      if (!serviceFormCredentials) {
        return true;
      }

      try {
        const data = await getService(codcli);
        await addServiceCredentials(data.id, serviceFormCredentials);
        return true;
      } catch (error) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
        return false;
      }
    },
  },
};
</script>
