<template>
  <material-card
    color="primary"
    title="Formulario de usuarios"
    text="Inserta un nuevo usuario"
  >
    <v-form ref="form">
      <v-container py-0>
        <v-layout wrap>
          <v-col xs12 md6>
            <v-text-field label="Nombre" v-model="name" :rules="nameRules" />
          </v-col>
          <v-col xs12 md6>
            <v-text-field
              label="Apellidos"
              v-model="lastName"
              :rules="nameRules"
            />
          </v-col>
          <v-col xs12 md6>
            <v-text-field
              label="Telefono"
              v-model="phoneNumber"
              :rules="phoneRules"
            />
          </v-col>
          <v-col xs12 md6>
            <v-text-field label="Email" v-model="email" :rules="emailRules" />
          </v-col>
          <v-col xs12 md6>
            <v-text-field
              label="Institucion"
              v-model="institution"
              :rules="institutionRules"
            />
          </v-col>
          <v-col xs12 md6>
            <v-text-field label="Roles" v-model="rol" />
          </v-col>
          <v-col xs12 md6>
            <v-file-input accept="image/*" label="Foto" />
          </v-col>
          <v-col xs12 md6>
            <v-text-field
              label="Cargo"
              v-model="position"
              :rules="positionRules"
            />
          </v-col>

          <v-col xs12 text-xs-right>
            <v-btn
              class="mx-0 font-weight-light"
              color="primary"
              @click="validate"
              >Agregar</v-btn
            >
          </v-col>
        </v-layout>
      </v-container>
    </v-form>
  </material-card>
</template>

<script>
import {
  isLettersWithBlankSpaces,
  isNumberAndLettersWithWhiteSpaces,
  isEmail,
} from "~/helpers/regex";

export default {
  name: "UserForm",
  data() {
    return {
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      institution: "",
      rol: "",
      picture: "",
      position: "",
      nameRules: [
        (v) => !!v || "Nombre es requerido",
        (v) => isLettersWithBlankSpaces(v) || "Caracteres no permitidos",
      ],
      phoneRules: [(v) => !!v || "El número de telefono es requerido"],
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => isEmail(v) || "E-mail must be valid",
      ],
      institutionRules: [
        (v) => !!v || "La institucion es requerida",
        (v) =>
          isNumberAndLettersWithWhiteSpaces(v) || "Caracteres no permitidos",
      ],
      positionRules: [
        (v) => !!v || "El cargo es requerido",
        (v) =>
          isNumberAndLettersWithWhiteSpaces(v) || "Caracteres no permitidos",
      ],
    };
  },
  methods: {
    validate: function () {
      this.$refs.form.validate();
    },
  },
};
</script>
