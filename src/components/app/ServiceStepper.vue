<template>
  <v-card>
    <v-card-title class="px-5"> Formulario de servicio </v-card-title>
    <v-card-text class="px-5">
      <gen-stepper-header class="mb-8" :steps="steps" :step="step">
      </gen-stepper-header>

      <keep-alive>
        <service-form
          ref="serviceForm"
          v-model="form"
          v-if="step === 1"
        ></service-form>
      </keep-alive>

      <keep-alive>
        <service-metering-form
          ref="serviceMeteringForm"
          v-model="form"
          v-if="step === 2"
        >
        </service-metering-form>
      </keep-alive>

      <keep-alive>
        <service-user-form
          ref="serviceUserForm"
          v-if="step === 3"
          v-model="formCredentials"
        />
      </keep-alive>
    </v-card-text>

    <v-card-text>
      <gen-stepper-actions
        :isFirstStep="step === 1"
        :isLastStep="step === steps.length"
        @click:next="confirmAndContinue"
        @click:submit="confirmAndContinue"
        @click:previous="step--"
        :disabled="loading"
      ></gen-stepper-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import ServiceMeteringForm from "@/components/app/ServiceMeteringForm.vue";
import ServiceForm from "@/components/app/ServiceForm.vue";
import TransformerForm from "@/components/app/TransformerForm.vue";
import ServiceUserForm from "@/components/app/ServiceUserForm.vue";

import { SERVICE_FORM, CREDENTIALS_FORM } from "@/utils/formTemplates";

import {
  updateService,
  addService,
  addServiceCredentials,
  updateServiceCredentials,
} from "@/services/app/service";

export default {
  name: "ServiceStepper",
  components: {
    TransformerForm,
    ServiceForm,
    ServiceUserForm,
    ServiceMeteringForm,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    isUpdating: {
      type: Boolean,
      default: false,
    },
    selectedService: {
      type: [Object, null],
      default: null,
    },
  },
  data() {
    return {
      steps: ["Datos básicos", "Transformador", "Credenciales"],
      step: 1,
      loading: false,

      form: {
        ...SERVICE_FORM,
      },

      formCredentials: {
        ...CREDENTIALS_FORM,
      },

      serviceId: null,
    };
  },

  watch: {
    isUpdating: {
      handler(val) {
        if (val) {
          this.fillForm();
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions(useNotificationsStore, ["addNotification"]),
    async confirmAndContinue() {
      try {
        const isValid = await this.handleStep();

        if (!isValid) return;

        this.step === this.steps.length ? this.submit() : this.step++;
      } catch (error) {
        this.addNotification({
          color: "error",
          message: "Error al intentar continuar",
        });
      }
    },

    async handleStep() {
      const keys = Object.keys(this.$refs);

      const step = this.$refs[keys[this.step - 1]];

      let isValid = (await step.validate()).valid;

      if (!isValid) return false;

      isValid = !!step.handleStep();

      return isValid;
    },

    async fillForm() {
      this.form = { ...this.selectedService };
      this.formCredentials = {
        ...this.selectedService.credentials,
      };
    },

    submit() {
      this.isUpdating
        ? this.editService(this.form, this.formCredentials)
        : this.addService(this.form, this.formCredentials);
    },

    async addService(form, formCredentials) {
      this.loading = true;

      try {
        form.institution_id = this.institutionId;

        const service = await addService(form);

        await addServiceCredentials(service.id, formCredentials);

        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
        this.$emit("success");
      } catch (error) {
        this.addNotification({ message: error.message, color: "error" });
      }
      this.loading = false;
    },

    async editService(id, form, formCredentials) {
      this.loading = true;

      try {
        await updateService(id, form);

        await updateServiceCredentials(id, formCredentials);

        this.addNotification({
          message: this.$t("notifications.succesfull_update"),
          color: "success",
        });
        this.$emit("success");
      } catch (error) {
        this.addNotification({ message: error.message, color: "error" });
      }
      this.loading = false;
    },
  },
};
</script>

<style></style>
