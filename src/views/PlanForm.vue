<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card
          color="primary"
          title="Formulario de planes"
          text="Inserta un nuevo plan"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field label="Año" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Plan del año" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Enero" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Febrero" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Marzo" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Abril" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Mayo" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Junio" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Julio" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Agosto" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Septiembre" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Octubre" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Noviembre" />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="Diciembre" />
                </v-flex>
                

                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="primary">Insertar</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ServiceForm",
  data: function() {
    return {
      alimentationSelect: "Simple",
      alimentationItems: ["Simple", "Doble"],
      metrageSelect: "Alta",
      metrageItems: ["Baja", "Alta"]
    };
  }
};
</script>