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
                  <app-service-card
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
            <material-details-sidebar
              class="mt-2"
              :allow-dialog="isScreenSmall"
              v-model:dialog="serviceDetailsDialog"
            >
              <app-service-details :service="selectedService" elevation="0" />
            </material-details-sidebar>
          </v-col>
        </v-row>

        <!-- Table display -->
        <v-row v-else>
          <v-col cols="12">
            <v-card elevation="0" class="mt-4">
              <app-service-table ref="table" class="pt-0 pb-0" />
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
          <material-form :title="$t('services.service_filter')">
            <v-text-field
              v-model="serviceName"
              :label="$t('institutions.fields.name')"
            />
          </material-form>
        </v-card>
      </v-menu>
    </v-speed-dial>

    <!-- Services dialog-form -->
    <v-dialog v-model="formDialog" width="400">
      <app-service-form
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
import axios from "axios";
import { mapState, mapActions, mapGetters } from "vuex";

import { api } from "~/config";

import debounce from "~/helpers/debouncer";

export default {
  name: "Service",
  middleware: "auth",

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
    ...mapGetters("service", { services: "tableData" }),
    ...mapState("app", ["notification", "isScreenSmall"]),
  },

  watch: {
    serviceName(val) {
      debounce(() => {
        console.log("lol");
        console.log(this.loadData);
        this.loadData(val);
      });
    },
  },

  mounted() {
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
    ...mapActions("app", ["addNotification", "setDrawerSubtitle"]),

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

    async getServices(id, val) {
      const url = `${this.$urlBuilder.getRoute(
        "service"
      )}?institution=${id},q=name:${val}`;
      let data;
      try {
        const response = await axios.get(url);
        data = response.data;
      } catch (err) {
        console.error(err);
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

        const newService = await this.getServiceByCodCli(form.codcli);
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
      const url = `${api.path("service")}/${id}`;

      try {
        await axios.patch(url, form);
        return true;
      } catch (error) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_update"),
          color: "error",
        });
        return false;
      }
    },

    getServiceByCodCli: async function (codcli) {
      const url = `${api.path("service")}/${codcli}`;

      const res = await axios.get(url);
      const service = res.data;

      return service;
    },

    async insertService(form) {
      try {
        form.institution_id = this.$route.params.id;
        await axios.post(api.path("service"), form);
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
        const urlForService = `${api.path("service")}/${codcli}`;
        const { data } = await axios.get(urlForService);
        const id = data.id;
        const urlForServiceCredentials = `${api.path("service")}/${id}/user`;
        await axios.post(urlForServiceCredentials, serviceFormCredentials);
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
      const url = `${api.path("service")}/${serviceId}`;

      try {
        axios.delete(url);
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
