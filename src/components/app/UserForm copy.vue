<template>
  <app-form :title="$t('users.form_title')">
    <v-form ref="form">
      <v-container py-0>
        <v-row>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.nameComputed" :label="$t('users.fields.name')" :rules="nameRules" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.lastNameComputed" :label="$t('users.fields.last_name')" :rules="nameRules" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.userNameComputed" :label="$t('users.fields.user_name')" :rules="userName" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.phoneNumberComputed" :label="$t('users.fields.phone')" :rules="phoneRules" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.emailComputed" :label="$t('users.fields.email')" :rules="emailRules" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.institutionComputed" :label="$t('users.fields.institution')" :rules="institutionRules" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.rolComputed" :label="$t('users.fields.rol')" />
          </v-col>
          <v-col xs="12" sm="12" md="6">
            <v-text-field v-model="form.positionComputed" :label="$t('users.fields.position')" :rules="positionRules" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <slot name="form-actions" :userSubmit="createUser" />
  </app-form>
</template>

<script>
import {
  isLettersWithBlankSpaces,
  isNumberAndLetters,
  isNumberAndLettersWithWhiteSpaces,
  isEmail
} from '~/helpers/regex'

export default {
  name: 'UserForm',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    enableCancel: {
      type: Boolean,
      default: false
    },
    name: { type: String, default: '' },
    lastName: { type: String, default: '' },
    userName: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    email: { type: String, default: '' },
    institution: { type: String, default: '' },
    rol: { type: String, default: '' },
    position: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        nameComputed: this.name,
        lastNameComputed: this.lastName,
        userNameComputed: this.userName,
        phoneNumberComputed: this.phoneNumber,
        emailComputed: this.email,
        institutionComputed: this.institution,
        rolComputed: this.rol,
        positionComputed: this.position
      },
      nameRules: [
        v => !!v || 'Nombre es requerido',
        v => isLettersWithBlankSpaces(v) || 'Caracteres no permitidos'
      ],
      userNameRules: [
        v => !!v || 'Nombre de usuario es requerido',
        v => isNumberAndLetters(v) || 'Caracteres no permitidos'
      ],
      phoneRules: [v => !!v || 'El número de telefono es requerido'],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => isEmail(v) || 'E-mail must be valid'
      ],
      institutionRules: [
        v => !!v || 'La institucion es requerida',
        v => isNumberAndLettersWithWhiteSpaces(v) || 'Caracteres no permitidos'
      ],
      positionRules: [
        v => !!v || 'El cargo es requerido',
        v => isNumberAndLettersWithWhiteSpaces(v) || 'Caracteres no permitidos'
      ]
    }
  },
  watch: {
    name: function (val) { this.nameComputed = val },
    lastName: function (val) { this.lastNameComputed = val },
    userName: function (val) { this.userNameComputed = val },
    phoneNumber: function (val) { this.phoneNumberComputed = val },
    email: function (val) { this.emailComputed = val },
    institution: function (val) { this.institutionComputed = val },
    rol: function (val) { this.rolComputed = val },
    position: function (val) { this.positionComputed = val }
  },
  methods: {
    validate: function () {
      this.$refs.form.validate()
    },
    createUser: function () {
      if (!this.validate()) {
        return
      }

      this.$emit('user-submit', this.form)
    },
    cancel: function () {
      this.$emit('cancel')
    }
  }
}
</script>
