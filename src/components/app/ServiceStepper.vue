<template>
  <v-card>
    <v-card-title> Formulario de servicio </v-card-title>
    <v-card-text>
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
          class-computed="ml-10 mr-10"
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

import { mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

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
    ...mapActions(useNotificationsStore, ["addNotification"]),
    async confirmAndContinue() {
      try {
        const isValid = await this.handleStep();

        if (!isValid) return;

        this.step++;
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
      throw new Error("Not implemented");
    },
  },
};
</script>

<style></style>
