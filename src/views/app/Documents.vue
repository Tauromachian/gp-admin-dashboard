<template>
  <v-container>
    <v-row>
      <v-col md="6" sm="6" xs="12">
        <v-card>
          <v-card-title>Ley Eléctrica 1287 de 1975</v-card-title>
          <v-card-text>Ley que regula el uso de la energía en Cuba.</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="openPdf('./LeyElectrica.pdf')">
              {{ $t('button.actions.see') }}
            </v-btn>
            <v-btn text download href="./LeyElectrica.pdf" color="primary">
              {{ $t('button.actions.download') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="6" sm="6" xs="12">
        <v-card>
          <v-card-title>Res-277-2014 Tarifas no residenciales</v-card-title>
          <v-card-text>Resolución para el control de las tarifas energéticas no residenciales.</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="openPdf('./02 Res-277-2014 Tarifas no residencial.pdf')">
              {{ $t('button.actions.see') }}
            </v-btn>
            <v-btn text download href="./02 Res-277-2014 Tarifas no residencial.pdf" color="primary">
              {{ $t('button.actions.download') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="6" sm="6" xs="12">
        <v-card>
          <v-card-title>Res-152-2018 Manual de Inspección de Portadores Energéticos</v-card-title>
          <v-card-text>Manual para la realización de las inspecciones a los portadores energéticos.</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="openPdf('./03 Res-152-2018 Manual de Insp Portadores Energeticos.pdf')">
              {{ $t('button.actions.see') }}
            </v-btn>
            <v-btn text download href="./03 Res-152-2018 Manual de Insp Portadores Energeticos.pdf" color="primary">
              {{ $t('button.actions.download') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="6" sm="6" xs="12">
        <v-card>
          <v-card-title>Metodología acomodo de carga</v-card-title>
          <v-card-text>
            Metodología para la confección de los estudios de control, regulación y
            acomodo de la carga energética.
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="openPdf('./04 Metodologia acomodo de carga.pdf')">
              {{ $t('button.actions.see') }}
            </v-btn>
            <v-btn text download href="./04 Metodologia acomodo de carga.pdf" color="primary">
              {{ $t('button.actions.download') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col md="6" sm="6" xs="12">
        <v-card>
          <v-card-title>Dec-Ley 345-2019 Desarrollo energías renovables</v-card-title>
          <v-card-text>Ley para el desarrollo de energías renovables.</v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="openPdf('./05 Dec-Ley 345-2019 Desarrollo energias renovables.pdf')">
              {{ $t('button.actions.see') }}
            </v-btn>
            <v-btn text download href="./05 Dec-Ley 345-2019 Desarrollo energias renovables.pdf" color="primary">
              {{ $t('button.actions.download') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Documents',
  methods: {
    openPdf (url) {
      window.open(url)
    }
  }
}
</script>
