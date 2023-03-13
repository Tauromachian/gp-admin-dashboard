<template>
  <v-container fluid class="mx-0 px-0">
    <div class="pl-8">
      <gen-filter>
        <institution-filter v-model:name="institutionName" />
      </gen-filter>
    </div>

    <!-- Institution content -->
    <div class="mt-2 mx-8">
      <v-row>
        <v-col
          v-for="(institution, key) in institutions"
          :key="institution.name + key"
          cols="12"
          xs="12"
          sm="6"
          md="4"
          lg="4"
          xl="3"
        >
          <institution-card
            :institution="institution"
            @see-click="showInstitutionDetails(institution.id)"
            @edit-click="openUpdateForm(institution.id)"
            @delete-click="removeInstitution(institution.id)"
          />
        </v-col>
      </v-row>
    </div>
      </v-col>

      <!-- Institution details -->
      <v-col sm="4" md="4" cols="12">
        <gen-details-sidebar
          :allow-dialog="$vuetify.display.mdAndDown"
          v-model:dialog="institutionDetailsDialog"
          toolbar-title="Institution details"
        >
          <institution-details
            :id="selectedInstitutionId"
            @submit-details="fillAndPatch"
            @coordinator-delete="fillAndPatch"
          />
        </gen-details-sidebar>
      </v-col>
    </v-row>

    <!-- Action button -->
    <gen-btn-add @click="openFormForInsert"></gen-btn-add>

    <!-- Institution form -->
    <v-dialog v-model="institutionFormDialog" width="500">
      <institution-form
        ref="institutionForm"
        enable-cancel
        v-model="institutionFormComputed"
        @submit="submitInstitution"
        @cancel="institutionFormDialog = false"
      >
      </institution-form>
    </v-dialog>
  </v-container>
</template>

<script>
import debounce from "basic-debouncer";

import { useInstitutionStore } from "@/stores/institution";
import { useNotificationsStore } from "@/stores/notifications";
import { mapActions, mapState } from "pinia";

import InstitutionDetails from "@/components/app/InstitutionDetails.vue";
import InstitutionForm from "@/components/app/InstitutionForm.vue";
import InstitutionCard from "@/components/app/InstitutionCard.vue";
import InstitutionFilter from "@/components/app/InstitutionFilter.vue";

import {
  getInstitutions,
  addInstitution,
  updateInstitution,
  deleteInstitution,
} from "@/services/app/institution";

export default {
  name: "Institution",
  middleware: "auth",
  components: {
    InstitutionDetails,
    InstitutionForm,
    InstitutionCard,
    InstitutionFilter,
  },
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
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions(useInstitutionStore, [
      "setInstitutions",
      "deleteInstitution",
      "addInstitution",
      "updateInstitution",
      "setFormData",
      "clearForm",
    ]),
    ...mapActions(useNotificationsStore, ["addNotification"]),
    async loadData(val = "") {
      const data = await getInstitutions(val);
      this.setInstitutions(data);

      if (this.institutions) {
        this.selectedInstitutionId = this.institutions[0].id;
      }
    },

    showInstitutionDetails(institutionId) {
      this.selectedInstitutionId = institutionId;
      if (this.$vuetify.display.mdAndDown) {
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
    openFormForInsert() {
      this.clearForm();
      this.isUpdating = false;
      if (this.$refs.institutionForm) {
        this.$refs.institutionForm.resetValidation();
      }
      this.institutionFormDialog = true;
    },

    async getInstitutions(filter) {
      try {
        const { data } = await getInstitutions(filter);
        return data;
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_get"),
          color: "error",
        });
      }
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

    async patchInstitution() {
      if (!(await this.$refs.institutionForm.validate()).valid) return;

      this.loading = true;

      try {
        const data = await updateInstitution(
          this.institutionToUpdateId,
          this.institutionFormComputed
        );

        this.addNotification({
          message: this.$t("notifications.succesfull_update"),
          color: "success",
        });

        this.updateInstitution(this.institutionToUpdateId, data);

        this.institutionFormDialog = false;
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_update"),
          color: "error",
        });
      }

      this.loading = false;
    },

    async createInstitution() {
      if (!(await this.$refs.institutionForm.validate()).valid) return;

      this.loading = true;

      try {
        const data = await addInstitution(this.institutionFormComputed);
        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
        this.addInstitution(data);
        this.institutionFormDialog = false;
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
      }

      this.loading = false;
    },

    async removeInstitution(id) {
      try {
        await deleteInstitution(id);
        this.deleteInstitution(id);
        this.addNotification({
          message: this.$t("notifications.successful_delete"),
          color: "success",
        });
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.error_at_delete"),
          color: "success",
        });
      }
    },
  },
};
</script>
