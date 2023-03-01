<template>
  <gen-form :title="$t('services.user.form_name')">
    <service-user-form-fields @update:form="updateForm" />
    <gen-delete-confirmation-dialog
      :text="$t('services.fields.delete_credentials_button')"
      color="danger"
      v-if="hasSensitiveData"
      v-model:delete-dialog-button="deleteCredentialsDialog"
      @on-delete-button-clicked="
        deleteCredentialsDialog = !deleteCredentialsDialog
      "
      @delete="deleteServiceCredentials"
    />
  </gen-form>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useServiceStore } from "@/stores/service";

import ServiceUserFormFields from "@/components/app/ServiceUserFormFields.vue";

export default {
  name: "ServiceUserForm",
  components: {
    ServiceUserFormFields,
  },
  data() {
    return {
      form: {},
      deleteCredentialsDialog: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(useServiceStore, ["hasSensitiveData"]),
  },
  methods: {
    ...mapActions(useServiceStore, ["setHasSensitiveData"]),
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
