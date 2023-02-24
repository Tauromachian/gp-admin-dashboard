<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row>
      <v-col md="4">
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="130">
            <img src="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg" />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h6 class="category text-gray font-weight-thin mb-3">CEO / CO-FOUNDER</h6>
            <h4 class="card-title font-weight-light">Alec Thompson</h4>
            <p
              class="card-description font-weight-light"
            >Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...</p>
            <v-btn color="success" rounded class="font-weight-light">Follow</v-btn>
          </v-card-text>
        </material-card>
      </v-col>
      <v-col md="8">
        <v-col>
          <v-card>
            <v-card-title>Información de contacto</v-card-title>
            <v-row justify="center">
              <v-col md="3">Nombre</v-col>
              <v-col md="8">{{ infoContact.name }}</v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="3">Email</v-col>
              <v-col md="8">{{ infoContact.email }}</v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="3">Telefono</v-col>
              <v-col md="8">{{ infoContact.phone }}</v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col>
          <v-card>
            <v-card-title>Información de empresa</v-card-title>
            <v-row justify="center">
              <v-col md="3">Institución</v-col>
              <v-col md="8">{{ infoCharge.institution }}</v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="3">Rol</v-col>
              <v-col md="8">{{ infoCharge.rol }}</v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="3">Cargo</v-col>
              <v-col md="8">{{ infoCharge.charge }}</v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      infoContact: {
        name: "Jorge Garcia",
        email: "jacomino@tuta.io",
        phone: 14912459
      },

      infoCharge: {
        institution: "",
        rol: "",
        charge: ""
      }
    };
  }
};
</script>
