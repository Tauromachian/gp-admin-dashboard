<template>
  <v-container fluid class="mx-0 px-0">
    <v-row>
      <!-- Action button -->
      <v-btn
        fixed
        bottom
        right
        class="mb-9 perfectly-round-button"
        fab
        dark
        color="primary"
        large
        @click="openInsertForm"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- Institution form -->
      <v-dialog v-model="institutionFormDialog" width="500">
        <app-institution-form
          ref="institutionForm"
          v-model="institutionFormComputed"
        >
          <material-form-actions
            :loading-buttons="loading"
            :enable-cancel="true"
            @on-submit="submitInstitution"
            @on-cancel="institutionFormDialog = false"
          />
        </app-institution-form>
      </v-dialog>

      <!-- Institution content -->
      <v-col sm="8" md="8" cols="12">
        <div class="mt-2 mx-8">
          <v-row>
            <v-col
              v-for="(institution, key) in institutions"
              :key="institution.name + key"
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              cols="12"
            >
              <app-institution-card
                :institution="institution"
                @see-click="showInstitutionDetails(institution.id)"
                @edit-click="openUpdateForm(institution.id)"
                @delete-click="removeInstitution(institution.id)"
                @services-click="goToServices(institution.id, institution.name)"
              />
            </v-col>
          </v-row>
        </div>
      </v-col>

      <!-- Institution details -->
      <v-col sm="4" md="4" cols="12">
        <material-details-sidebar
          :allow-dialog="isScreenSmall"
          v-model:dialog="institutionDetailsDialog"
          toolbar-title="Institution details"
        >
          <app-institution-details
            :id="selectedInstitutionId"
            @submit-details="fillAndPatch"
            @coordinator-delete="fillAndPatch"
          />
        </material-details-sidebar>
      </v-col>
    </v-row>
    <material-filter left>
      <app-institution-filter v-model:name="institutionName" />
    </material-filter>
  </v-container>
</template>

<script>
import axios from "axios";
import debounce from "basic-debouncer";

import { useAppStore } from "@/stores/app";
import { useInstitutionStore } from "@/stores/institution";
import { mapActions, mapState } from "pinia";

export default {
  name: "Institution",
  middleware: "auth",
  data: function () {
    return {
      selectedInstitutionId: "",
      institutionToUpdateId: "",
      institutionToUpdate: {},
      institutionFormDialog: false,
      institutionDetailsDialog: false,
      isUpdating: false,
      loading: false,
      institutionName: "",
      timer: null,
    };
  },
  computed: {
    ...mapState(useInstitutionStore, ["institutions", "institutionForm"]),
    ...mapState(useAppStore, ["notification", "isScreenSmall"]),
    ...mapState(useInstitutionStore, ["institutionsById"]),
    institutionFormComputed: {
      get() {
        return this.institutionForm;
      },
      set(form) {
        this.setFormData(form);
      },
    },
  },
  watch: {
    institutionName(val) {
      debounce(() => {
        this.loadData(val);
      });
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions(useInstitutionStore, [
      "setInstitutions",
      "deleteInstitution",
      "addInstitution",
      "updateInstitution",
      "setFormData",
      "clearFormData",
    ]),
    ...mapActions(useAppStore, ["addNotification", "setDrawerSubtitle"]),

    showInstitutionDetails(institutionId) {
      this.selectedInstitutionId = institutionId;
      if (this.isScreenSmall) {
        this.institutionDetailsDialog = true;
      }
    },
    submitInstitution() {
      if (this.isUpdating) {
        this.patchInstitution();
        this.isUpdating = false;
      } else {
        this.createInstitution();
      }
    },
    openInsertForm() {
      this.clearFormData();
      this.isUpdating = false;
      if (this.$refs.institutionForm) {
        this.$refs.institutionForm.resetValidation();
      }
      this.institutionFormDialog = true;
    },
    goToServices(id, name) {
      this.setDrawerSubtitle(name);
      this.$router.push({ name: "services", params: { id } });
    },
    async loadData(val = "") {
      if (val) {
        const data = await this.getInstitutions(val);
        this.setInstitutions(data);
      } else {
        const data = await this.getInstitutions();
        this.setInstitutions(data);
      }
      this.selectedInstitutionId = this.institutions[0].id;
    },
    async getInstitutions(filter) {
      let url = this.$urlBuilder.getRoute("institution");
      if (filter) {
        url += `?q=name:${filter}`;
      }
      let data;
      try {
        const response = await axios.get(url);
        data = response.data;
      } catch (err) {
        console.error(err);
      }
      return data;
    },
    openUpdateForm(id) {
      this.loadDataForUpdate(id);
      this.institutionFormDialog = true;
      this.isUpdating = true;
    },
    loadDataForUpdate(id) {
      this.institutionToUpdateId = id;
      this.institutionFormComputed = Object.assign(
        {},
        this.institutionsById.get(id)[0]
      );
    },
    fillAndPatch() {
      this.loadDataForUpdate(this.selectedInstitutionId);
      this.patchInstitution();
    },
    // axios call methods
    async patchInstitution() {
      const url = `/api/v1/institution/${this.institutionToUpdateId}`;
      this.loading = true;
      let notification;
      let data;
      try {
        const response = await axios.patch(url, this.institutionFormComputed);
        data = response.data;
      } catch (err) {
        notification = {
          message: this.$t("notifications.unsuccesfull_update"),
          color: "error",
        };
        this.addNotification(notification);
        this.loading = false;
        console.log(err);
        return;
      }
      notification = {
        message: this.$t("notifications.succesfull_update"),
        color: "success",
      };
      this.addNotification(notification);
      this.updateInstitution({
        institutionId: this.institutionToUpdateId,
        institution: data,
      });
      this.loading = false;
      this.institutionFormDialog = false;
    },

    async createInstitution(form) {
      if (!this.$refs.institutionForm.validate()) {
        return;
      }

      const url = "/api/v1/institution";
      this.loading = true;
      let data;
      let notification;

      try {
        const response = await axios.post(url, this.institutionFormComputed);
        data = response.data;
      } catch (err) {
        notification = {
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        };
        this.addNotification(notification);
        this.loading = false;
        console.log(err);
        return;
      }
      notification = {
        message: this.$t("notifications.succesfull_insert"),
        color: "success",
      };
      this.addNotification(notification);
      this.addInstitution(data);
      this.loading = false;
      this.institutionFormDialog = false;
    },

    async removeInstitution(id) {
      const url = `/api/v1/institution/${id}`;
      let notification;
      try {
        await axios.delete(url);
      } catch (err) {
        console.error(err);
        notification = {
          message: this.$t("notifications.error_at_delete"),
          color: "success",
        };
        this.addNotification(notification);
        console.error(err);
      }
      this.deleteInstitution(id);
      notification = {
        message: this.$t("notifications.successful_delete"),
        color: "success",
      };
      this.addNotification(notification);
    },
  },
};
</script>
