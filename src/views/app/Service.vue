<template>
  <v-container fluid>
    <!-- Services displayer -->
    <v-card class="mt-4">
      <v-card-text>
        <gen-toolbar
          v-model:visible-columns="visibleColumns"
          :column-defs="headers"
          :isRowSelected="selectedRows.length > 0"
          @click:delete-button="checkRowSelected"
          @click:delete="removeService"
        >
          <service-form :codcli="codcli" @submit="serviceSubmit">
          </service-form>
        </gen-toolbar>
        <easy-data-table
          class="mt-3"
          v-model:items-selected="selectedRows"
          :headers="headers"
          :items="services"
          :loading="false"
          v-model:items-per-page="itemsPerPage"
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
        </easy-data-table>
      </v-card-text>
    </v-card>

    <!-- Services dialog-form -->
    <v-dialog v-model="formDialog" width="400">
      <service-form
        ref="form"
        :codcli="codcli"
        @service-submit="submitService"
        @click:cancel="closeFormDialog"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useServiceStore } from "@/stores/service";
import { useNotificationsStore } from "@/stores/notifications";

import ServiceForm from "@/components/app/ServiceForm.vue";
import ServiceCard from "@/components/app/ServiceCard.vue";
import ServiceDetails from "@/components/app/ServiceDetails.vue";

import {
  getServices,
  updateService,
  addService,
  addServiceCredentials,
  getService,
  deleteService,
} from "@/services/app/service";

export default {
  name: "Service",
  middleware: "auth",

  components: {
    ServiceForm,
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

  computed: {
    ...mapState(useServiceStore, ["services"]),
    institutionId() {
      return this.$route.params.id;
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
      removeServiceFromStore: "deleteService",
      addServiceToStore: "addService",
      editServiceInStore: "editService",
      clearCredentialsFormData: "clearCredentialsFormData",
    }),
    ...mapActions(useNotificationsStore, ["addNotification"]),

    async loadData() {
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
    },

    submitService(form, credentialsForm) {
      this.isFormUpdating
        ? this.editService(form, credentialsForm)
        : this.addService(form, credentialsForm);
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
      this.isFormUpdating = true;
      this.formDialog = true;
      this.codcli = codcli;
    },

    async addService(form, serviceFormCredentials) {
      this.loading = true;

      try {
        const serviceInsertionStatus = await this.insertService(form);

        if (!serviceInsertionStatus) {
          this.loading = false;
          return;
        }

        const serviceCredentialsInsertionStatus =
          await this.insertServiceCredentials(
            serviceFormCredentials,
            form.codcli
          );

        if (!serviceCredentialsInsertionStatus) {
          this.loading = false;
          return;
        }

        const newService = await getService(form.codcli);
        this.addServiceToStore(newService);
        this.closeFormDialog();
        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
      } catch (error) {
        this.addNotification({ message: error.message, color: "error" });
      }
      this.loading = false;
    },

    async editService(form, serviceCredentialsForm) {
      this.loading = true;

      const patchServiceStatus = this.patchService(form, form.id);

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

      this.editServiceInStore(form);

      this.addNotification({
        message: this.$t("notifications.succesfull_update"),
        color: "success",
      });
      this.loading = false;
      this.formDialog = false;
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

    async insertService(form) {
      try {
        form.institution_id = this.institutionId;
        await addService(form);
        return true;
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
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
        const id = data.id;

        await addServiceCredentials(id, serviceFormCredentials);
        return true;
      } catch (error) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
        return false;
      }
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
        await deleteService(this.selectedRows[0]);
        this.removeServiceFromStore(serviceId);
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
