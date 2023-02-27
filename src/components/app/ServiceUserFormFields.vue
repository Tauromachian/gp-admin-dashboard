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
          :rules="nameRules"
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
          :rules="passwordRules"
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
          :rules="ipRules"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      ipRules: [(v) => this.ipRulesFunction(v) || "Introduzca un ip valido"],
      nameRules: [
        (v) =>
          v.length > 6 ||
          "Las credenciales deben tener un largo de 6 letras o más",
        (v) => isSentence(v) || "Ha introducido caracteres no permitidos",
      ],
      passwordRules: [(v) => !!v || "El password es requerido"],
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
    ipRulesFunction(v) {
      if (!v) {
        return true;
      }

      const { ip, mask } = this.splitIpFromMask(v);

      if (mask === "") {
        return false;
      }

      if (!this.isMask(mask)) {
        return false;
      }

      if (!this.isIp(ip)) {
        return false;
      }

      return true;
    },
    splitIpFromMask(completeIp) {
      let ipNumberAndMask = [];
      ipNumberAndMask = completeIp.split("/");

      return {
        ip: ipNumberAndMask[0],
        mask: ipNumberAndMask[1],
      };
    },
    isMask(maskNumber) {
      if (!maskNumber) {
        return true;
      }
      return isIpMask(maskNumber);
    },
    isIp(ipNumber) {
      if (!ipNumber.includes(".")) {
        return false;
      }

      const ipNumbers = ipNumber.split(".");

      if (ipNumbers.length !== 4) {
        return false;
      }

      for (const ipNumber of ipNumbers) {
        if (!isIpNumber(ipNumber)) {
          return false;
        }
      }

      return true;
    },
  },
};
</script>
