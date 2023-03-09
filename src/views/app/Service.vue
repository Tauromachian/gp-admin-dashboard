<template>
  <v-container fluid>
    <!-- Services displayer -->
    <v-card class="mt-4">
      <v-card-text>
        <gen-toolbar
          v-model:visible-columns="visibleColumns"
          :column-defs="headers"
          :isRowSelected="selectedRows.length > 0"
          @click:delete-button="isRowSelected('delete')"
          @click:update-button="openFormForEdit"
          @click:delete="removeService"
        >
        </gen-toolbar>
        <easy-data-table
          class="mt-3"
          v-model:items-selected="selectedRows"
          :headers="visibleHeaders"
          :items="services"
          :loading="loading"
          loading-text="Cargando Servicios..."
          single-select
          show-select
          @click:row="
            (item, row) => {
              seeDetails(item, true);
              setActiveRow(row);
            }
          "
        >
          <template #loading>
            <v-progress-circular
              color="primary"
              :size="60"
              :width="5"
              indeterminate
            ></v-progress-circular>
          </template>
        </easy-data-table>
      </v-card-text>
    </v-card>

    <gen-btn-add @click="openFormForInsert"></gen-btn-add>

    <!-- Services dialog-form -->
    <v-dialog v-model="formDialog" width="400">
      <service-stepper
        ref="form"
        :is-updating="isFormUpdating"
        :selected-service="selectedRows[0]"
        @success="closeFormDialog"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useServiceStore } from "@/stores/service";
import { useNotificationsStore } from "@/stores/notifications";

import ServiceStepper from "@/components/app/ServiceStepper.vue";
import ServiceCard from "@/components/app/ServiceCard.vue";
import ServiceDetails from "@/components/app/ServiceDetails.vue";

import { getServices, deleteService } from "@/services/app/service";

export default {
  name: "Service",
  middleware: "auth",

  components: {
    ServiceStepper,
    ServiceCard,
    ServiceDetails,
  },

  data() {
    return {
      isTableActive: false,
      loading: false,
      formDialog: false,
      isFormUpdating: false,
      serviceDetailsDialog: false,

      selectedService: {},
      selectedRows: [],
      visibleColumns: [],
      itemsPerPage: 25,

      codcli: {},
      selectedService: {},
    };
  },

  metaInfo() {
    return { title: this.$t(`route.${this.$route.name}`) };
  },

  mounted() {
    this.visibleColumns = this.headers.map((header) => header.value);
  },

  computed: {
    ...mapState(useServiceStore, ["services"]),
    institutionId() {
      return this.$route.params.id;
    },
    visibleHeaders() {
      return this.headers.filter((header) => {
        return this.visibleColumns.includes(header.value);
      });
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

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions(useServiceStore, {
      setServices: "setServices",
      addServiceToStore: "addService",
      editServiceInStore: "editService",
      clearCredentialsFormData: "clearCredentialsFormData",
    }),
    ...mapActions(useNotificationsStore, ["addNotification"]),

    async loadData() {
      this.loading = true;
      try {
        const services = await getServices({ id: this.institutionId });
        this.setServices(services);
        this.selectedService = this.tableData[0];
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_get"),
          color: "error",
        });
      }
      this.loading = false;
    },

    openFormForInsert() {
      if (this.isFormUpdating) {
        this.$refs.form.reset();
      }
      this.codcli = "";
      this.isFormUpdating = false;
      this.formDialog = true;
    },

    openFormForEdit(codcli) {
      if (!this.isRowSelected("update")) return;

      this.isFormUpdating = true;
      this.formDialog = true;
      this.codcli = codcli;
    },

    closeFormDialog() {
      this.formDialog = false;
    },

    isRowSelected(type) {
      if (this.selectedRows.length !== 0) return true;

      this.addNotification({
        message: this.$t(
          type === "delete"
            ? "notifications.select_row_before_delete"
            : "notifications.select_row_before_update"
        ),
        color: "info",
      });

      return false;
    },

    async removeService() {
      try {
        await deleteService(this.selectedRows[0].id);
        this.loadData();
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
    },
  },
};
</script>
