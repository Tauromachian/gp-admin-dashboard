<template>
  <v-card>
    <v-card-title> Formulario de servicio </v-card-title>
    <v-card-text>
      <gen-stepper-header class="mb-8" :steps="steps" :step="step">
      </gen-stepper-header>

      <keep-alive>
        <service-form v-model="form" v-if="step === 1"></service-form>
      </keep-alive>

      <keep-alive>
        <service-metering-form v-model="form" v-if="step === 2">
        </service-metering-form>
      </keep-alive>

      <keep-alive>
        <service-user-form
          v-if="step === 3"
          v-model="formCredentials"
          class-computed="ml-10 mr-10"
          @on-delete-credentials="deleteServiceCredentials"
          @click:submit="createServiceCredentials"
          @click:cancel="closeServiceCredentialsFormDialog"
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
import ServiceMeteringForm from "@/components/app/ServiceMeteringForm.vue";
import ServiceForm from "@/components/app/ServiceForm.vue";
import TransformerForm from "@/components/app/TransformerForm.vue";
import ServiceUserForm from "@/components/app/ServiceUserForm.vue";

import { SERVICE_FORM, CREDENTIALS_FORM } from "@/utils/formTemplates";

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

      serviceCredentialsFormDialog: false,
      serviceId: null,
    };
  },
  methods: {
    confirmAndContinue() {
      this.step++;
    },

    async deleteServiceCredentials() {
      if (!this.serviceId) return;

      try {
        await deleteService(this.serviceId);
      } catch (error) {
        return this.$emit("delete-unsuccesful");
      }

      this.$emit("delete-succesful");
    },

    async fillForm() {
      throw new Error("Not implemented");
    },
  },
};
</script>

<style></style>
