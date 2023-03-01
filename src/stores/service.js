import { defineStore } from "pinia";
import { Indexer } from "basic-indexer";

const CREDENTIALS_FORM_TEMPLATE = {
  username: "",
  password: "",
  password_confirmation: "",
  device_token: "",
  accepted_ip: "",
};

export const useServiceStore = defineStore("service", {
  state: () => ({
    hasSensitiveData: false,
    credentialsForm: Object.assign({}, CREDENTIALS_FORM_TEMPLATE),
    services: [],
  }),

  getters: {
    isLogged: (state) => !!state.token,
    tableData() {
      if (!this.services) return [];
      return this.services.map((service) => {
        const formatedService = Object.assign({}, service);
        formatedService.exclusivo = numberToString(formatedService.exclusivo);
        return formatedService;
      });
    },
  },

  actions: {
    setCredentialsFormData(data) {
      const keys = Object.keys(state.credentialsForm);

      for (const key of keys) {
        state.credentialsForm[key] = formData[key];
      }
    },
    clearCredentialsFormData() {
      this.credentialsForm = { ...CREDENTIALS_FORM_TEMPLATE };
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
