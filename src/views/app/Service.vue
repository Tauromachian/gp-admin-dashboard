<template>
  <v-container fill-height fluid grid-list-xl>
    <!-- Services displayer -->
    <v-row wrap>
      <v-col>
        <!-- Cards display -->
        <v-row v-if="!isTableActive">
          <v-col sm="12" md="8" cols="12">
            <div class="mt-2 mx-8">
              <v-row>
                <v-col
                  v-for="(service, key) in services"
                  :key="service.name + key"
                  xs="12"
                  sm="12"
                  md="6"
                  lg="6"
                  xl="6"
                  cols="12"
                >
                  <service-card
                    :service="service"
                    @click:see="showServiceDetails(service)"
                    @click:edit="openFormForEdit(service.codcli)"
                    @click:delete="removeService(service.id)"
                    @click:manage="
                      goToManageServiceSubdata(service.id, service.name)
                    "
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
          <!-- Details sidebar -->
          <v-col sm="4" md="4" cols="12">
            <gen-details-sidebar
              class="mt-2"
              :allow-dialog="isScreenSmall"
              v-model:dialog="serviceDetailsDialog"
            >
              <service-details :service="selectedService" elevation="0" />
            </gen-details-sidebar>
          </v-col>
        </v-row>

        <!-- Table display -->
        <v-row v-else>
          <v-col cols="12">
            <v-card elevation="0" class="mt-4">
              <service-table ref="table" class="pt-0 pb-0" />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Service view actions   -->
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
        @click="openFormForInsert"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- View menu button -->
      <v-menu top class="z-index-100" :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            fab
            color="primary"
            v-bind="attrs"
            class="perfectly-round-button"
            v-on="on"
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
              <v-switch v-model="isTableActive" label="Table" />
            </div>
          </v-card-text>
        </v-card>
      </v-menu>

      <!-- View menu button -->
      <v-menu top class="z-index-100" :close-on-content-click="false">
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            fab
            color="primary"
            v-bind="attrs"
            class="perfectly-round-button"
            v-on="on"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <v-card>
          <gen-form :title="$t('services.service_filter')">
            <v-text-field
              v-model="serviceName"
              :label="$t('institutions.fields.name')"
            />
          </gen-form>
        </v-card>
      </v-menu>
    </v-speed-dial>

    <!-- Services dialog-form -->
    <v-dialog v-model="formDialog" width="400">
      <service-form
        ref="form"
        v-model:inserted-succesfully="insertedSuccesfully"
        :codcli="codcli"
        @service-submit="submitService"
        @delete-succesful="deleteSuccesful"
        @delete-unsuccesful="deleteUnsuccesful"
        @click:cancel="closeFormDialog"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import ServiceForm from "@/components/app/ServiceForm.vue";
import ServiceTable from "@/components/app/ServiceTable.vue";
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

import debounce from "basic-debouncer";

export default {
  name: "Service",
  middleware: "auth",

  components: {
    ServiceForm,
    ServiceTable,
    ServiceCard,
    ServiceDetails,
  },

  data() {
    return {
      fab: false,
      serviceName: "",
      isTableActive: false,
      loading: false,
      formDialog: false,
      insertedSuccesfully: false,
      isFormUpdating: false,
      codcli: {},
      selectedService: {},
      serviceDetailsDialog: false,
    };
  },

  metaInfo() {
    return { title: this.$t("route." + this.$route.name) };
  },

  computed: {
    ...mapState("service", { services: "tableData" }),
    ...mapState("app", ["notification", "isScreenSmall"]),
  },

  watch: {
    serviceName(val) {
      debounce(() => {
        this.loadData(val);
      });
    },
  },

  created() {
    this.loadData();
  },

  methods: {
    ...mapActions("service", {
      setServices: "setServices",
      removeServiceFromStore: "deleteService",
      addServiceToStore: "addService",
      editServiceInStore: "editService",
      clearCredentialsFormData: "clearCredentialsFormData",
    }),
    ...mapActions(useNotificationsStore, ["addNotification"]),

    async loadData(val = "") {
      const id = this.$route.params.id;
      const services = await this.getServices(id, val);
      this.setServices(services);
      this.selectedService = this.services[0];
    },

    goToManageServiceSubdata(id, name) {
      this.setDrawerSubtitle(name);
      this.$router.push({ name: "oneRead", params: { idService: id } });
    },

    showServiceDetails(service) {
      this.selectedService = service;
      if (this.isScreenSmall) {
        this.serviceDetailsDialog = true;
      }
    },

    submitService(form, credentialsForm) {
      this.isFormUpdating
        ? this.editService(form, credentialsForm)
        : this.addService(form, credentialsForm);
    },

    deleteSuccesful() {
      this.addNotification({
        message: this.$t("notifications.successful_delete"),
        color: "success",
      });
    },

    deleteUnsuccesful(err) {
      this.addNotification({ message: err, color: "error" });
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

    async getServices() {
      try {
        const data = await getServices();
        return data;
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_get"),
          color: "error",
        });
      }
      return data;
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
        this.insertedSuccesfully = true;
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
        form.institution_id = this.$route.params.id;
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

    async removeService(serviceId) {
      try {
        await deleteService(serviceId);
        this.removeServiceFromStore(serviceId);
        this.addNotification({
          messsage: this.$t("notifications.successful_delete"),
          color: "success",
        });
      } catch (error) {
        this.addNotification({
          message: this.$t("notifications.error_at_delete"),
          color: "error",
        });
        console.log(error);
      }
    },
  },
};
</script>
