<template>
  <v-container py-0>
    <v-row wrap>
      <v-col
        v-if="!hasSensitiveData"
        xs="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        cols="12"
      >
        <v-text-field
          v-model="username"
          :disabled="disabled"
          :label="$t('services.user.username')"
          :rules="[rules.required(), rules.sentence(), rules.min(6)]"
        />
      </v-col>
      <v-col
        v-if="!hasSensitiveData"
        xs="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        cols="12"
      >
        <v-text-field
          v-model="password"
          :disabled="disabled"
          :type="showPasswordText ? 'text' : 'password'"
          :label="$t('services.user.password')"
          :rules="passwordRules"
          :append-icon="showPasswordText ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPasswordText = !showPasswordText"
        />
      </v-col>
      <v-col
        v-if="!hasSensitiveData"
        xs="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        cols="12"
      >
        <v-text-field
          v-model="passwordConfirmation"
          :disabled="disabled"
          :type="showPasswordText ? 'text' : 'password'"
          :label="$t('services.user.password_confirmation')"
          :rules="[rules.required(), rules.password()]"
          :append-icon="showPasswordText ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPasswordText = !showPasswordText"
        />
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
        <v-text-field
          v-model="deviceTokenComputed"
          :label="$t('services.fields.device_token') + ` (${$t('optional')})`"
        />
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="6" xl="6" cols="12">
        <v-text-field
          v-model="acceptedIpComputed"
          :disabled="disabled"
          :label="$t('services.fields.required_ip') + ` (${$t('optional')})`"
          :rules="[rules.required(), rules.ip()]"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, min, sentence, password, ip } from "@/utils/rules";
import { isSentence, isIpNumber, isIpMask } from "~/helpers/regex";
import { mapState } from "pinia";

export default {
  name: "ServiceUserFormFields",
  data() {
    return {
      username: "",
      password: "",
      passwordConfirmation: "",
      deviceToken: "",
      acceptedIp: "",
      disabled: false,
      showPasswordText: false,
      rules: { required, min, sentence, password, ip },
    };
  },
  computed: {
    ...mapState("service", ["credentialsForm", "hasSensitiveData"]),
    deviceTokenComputed: {
      get() {
        return this.credentialsForm.device_token;
      },
      set(val) {
        this.deviceToken = val;
      },
    },
    acceptedIpComputed: {
      get() {
        return this.credentialsForm.accepted_ip;
      },
      set(val) {
        this.acceptedIp = val;
      },
    },
    formComputed() {
      const form = {
        username: this.username,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        device_token: this.deviceToken,
        accepted_ip: this.acceptedIp,
      };

      return form;
    },
  },
  watch: {
    formComputed(form) {
      this.$emit("update:form", form);
    },
  },
  mounted() {
    this.fillForm();
  },
  methods: {
    fillForm() {
      this.deviceToken = this.$store.state.service.credentialsForm.device_token;
      this.acceptedIp = this.$store.state.service.credentialsForm.accepted_ip;
    },
  },
};
</script>
