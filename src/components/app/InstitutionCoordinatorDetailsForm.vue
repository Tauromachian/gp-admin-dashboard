<template>
  <material-form :title="$t('institutions.coordinator_details_form_name')">
    <v-form ref="form" class="pl-3 pr-3">
      <v-text-field
        v-model="name"
        :label="$t('institutions.fields.name')"
        :rules="rules.required()"
      />
      <v-text-field
        v-model="charge"
        :label="$t('institutions.fields.charge')"
        :rules="rules.required()"
      />
      <v-btn icon color="primary" @click="addPhone">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      {{ $t("institutions.fields.phones") }}
      <v-text-field
        v-for="(phone, key) in phones"
        :key="'phone' + key"
        v-model="phones[key]"
        :label="$t('institutions.fields.phone')"
        :rules="[rules.required(), rules.phone()]"
      >
        <template #append-outer>
          <v-btn class="mt-0 mb-0" icon @click="deletePhone(key)">
            <v-icon color="primary"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <v-btn icon color="primary" @click="addMail">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
      {{ $t("institutions.fields.mails") }}
      <v-text-field
        v-for="(mail, key) in emails"
        :key="'mail' + key"
        v-model="emails[key]"
        :label="$t('institutions.fields.mail')"
        :rules="[rules.required(), rules.email()]"
      >
        <template #append-outer>
          <v-btn class="mt-0 mb-0" icon @click="deleteMail(key)">
            <v-icon color="primary"> mdi-delete </v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <material-form-actions
        class="pl-0 pr-0"
        enable-cancel
        @on-submit="submitClick"
        @on-cancel="cancelClick"
      />
    </v-form>
  </material-form>
</template>

<script>
import { required, email, phone } from "@/utils/rules";

export default {
  name: "InstitutionCoordinatorDetailsForm",
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.value.name,
      charge: this.value.charge,
      phones: this.value.phones,
      emails: this.value.emails,
      rules: { required, email, phone },
    };
  },
  computed: {
    coordinator: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    addPhone() {
      if (!this.phones) {
        this.phones = [];
      }
      this.phones.push("");
    },
    addMail() {
      if (!this.emails) {
        this.emails = [];
      }
      this.emails.push("");
    },
    deletePhone(key) {
      this.phones.splice(key, 1);
    },
    deleteMail(key) {
      this.emails.splice(key, 1);
    },
    purgeEmptyFields(array) {
      if (!array || !array.length) {
        return;
      }
      for (let i = 0; i < array.length; i++) {
        if (!array[i]) {
          array.splice(i, 1);
        }
      }
    },
    submitClick() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.purgeEmptyFields(this.phones);
      this.purgeEmptyFields(this.emails);
      this.coordinator.phones = this.phones;
      this.coordinator.emails = this.emails;
      this.coordinator.name = this.name;
      this.coordinator.charge = this.charge;
      this.$emit("submit-click");
    },
    cancelClick() {
      this.$emit("cancel-click");
    },
  },
};
</script>

<style></style>
