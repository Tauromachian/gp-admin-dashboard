<template>
  <v-form ref="form" :title="$t('services.user.form_name')">
    <v-text-field
      v-model="form.username"
      :label="$t('services.user.username')"
      :rules="[rules.required(), rules.sentence(), rules.min(6)]"
    />
    <v-text-field
      v-model="form.password"
      :type="showPasswordText ? 'text' : 'password'"
      :label="$t('services.user.password')"
      :rules="[rules.required(), rules.password()]"
      :append-icon="showPasswordText ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPasswordText = !showPasswordText"
    />
    <v-text-field
      v-model="form.passwordConfirmation"
      :type="showPasswordText ? 'text' : 'password'"
      :label="$t('services.user.password_confirmation')"
      :rules="[rules.required(), rules.password()]"
      :append-icon="showPasswordText ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPasswordText = !showPasswordText"
    />
    <v-text-field
      v-model="form.deviceTokenComputed"
      :label="$t('services.fields.device_token') + ` (${$t('optional')})`"
    />
    <v-text-field
      v-model="form.acceptedIpComputed"
      :label="$t('services.fields.required_ip') + ` (${$t('optional')})`"
      :rules="[rules.required(), rules.ip()]"
    />
  </v-form>
</template>

<script>
import { required, min, sentence, password, ip } from "@/utils/rules";

import { CREDENTIALS_FORM } from "@/utils/formTemplates";

export default {
  name: "ServiceUserForm",
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      showPasswordText: false,
      rules: { required, min, sentence, password, ip },
    };
  },

  computed: {
    form: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
  methods: {
    handleStep() {
      return true;
    },

    async validate() {
      return await this.$refs.form.validate();
    },

    cleanForm() {
      this.form = { ...CREDENTIALS_FORM };
    },
  },
};
</script>
