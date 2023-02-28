<template>
  <v-form ref="form">
    <gen-form :title="$t('services.user.form_name')">
      <app-service-user-form-fields @update:form="updateForm" />
      <v-col v-if="hasSensitiveData" xs="12" sm="12" md="4" cols="12">
        <gen-delete-confirmation-dialog
          :text="$t('services.fields.delete_credentials_button')"
          color="danger"
          v-model:delete-dialog-button="deleteCredentialsDialog"
          @on-delete-button-clicked="
            deleteCredentialsDialog = !deleteCredentialsDialog
          "
          @delete="deleteServiceCredentials"
        />
      </v-col>
      <slot
        name="form-actions"
        :createServiceCredentials="createServiceCredentials"
      >
        <gen-form-actions
          :loading-buttons="loading"
          :enable-cancel="true"
          @on-submit="createServiceCredentials"
          @on-cancel="closeClick"
        />
      </slot>
    </gen-form>
  </v-form>
</template>

<script>
import { mapState, mapActions } from "pinia";

export default {
  name: "ServiceUserForm",
  data() {
    return {
      form: {},
      deleteCredentialsDialog: false,
      loading: false,
    };
  },
  computed: {
    ...mapState("service", ["hasSensitiveData"]),
  },
  methods: {
    ...mapActions("service", ["setHasSensitiveData"]),
    updateForm(form) {
      this.form = form;
    },
    createServiceCredentials(v) {
      if (!this.validate()) {
        return;
      }
      this.$emit("click:submit", this.form);
    },
    closeClick() {
      this.$emit("click:cancel");
    },
    validate: function () {
      return this.$refs.form.validate();
    },
    deleteServiceCredentials() {
      this.setHasSensitiveData(false);
      this.$emit("on-delete-credentials");
    },
  },
};
</script>
