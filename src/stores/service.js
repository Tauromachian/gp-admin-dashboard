import { defineStore } from "pinia";
import { Indexer } from "basic-indexer";

import { CREDENTIALS_FORM } from "@/utils/formTemplates";

export const useServiceStore = defineStore("service", {
  state: () => ({
    hasSensitiveData: false,
    credentialsForm: Object.assign({}, CREDENTIALS_FORM),
    services: [],
  }),

  getters: {
    isLogged: (state) => !!state.token,
  },

  actions: {
    setCredentialsFormData(data) {
      const keys = Object.keys(state.credentialsForm);

      for (const key of keys) {
        state.credentialsForm[key] = formData[key];
      }
    },
    clearCredentialsFormData() {
      this.credentialsForm = { ...CREDENTIALS_FORM };
    },
    setHasSensitiveData(hasSensitiveData) {
      this.hasSensitiveData = hasSensitiveData;
    },
    setServices(services) {
      this.services = services;
    },
    deleteService(serviceId) {
      const index = this.services.findIndex(
        (service) => service.id !== serviceId
      );
      this.services.splice(index, 1);
    },
    addService(service) {
      this.services.push(service);
    },
    updateService(service) {
      const index = this.services.findIndex(
        (service) => service.id === service.id
      );
      this.services.splice(index, 1, service);
    },
  },
});
