<template>
  <v-container class="container">
    <v-row>
      <v-col
        lg="4"
        md="6"
        sm="6"
        xs="6"
        v-for="(document, index) in documents"
        :key="`document-${index}`"
      >
        <v-card>
          <v-card-title>{{ document.title }} </v-card-title>
          <v-card-text>{{ document.description }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              color="primary"
              @click="openPdf(document.fileSource)"
            >
              {{ $t("button.actions.see") }}
            </v-btn>
            <v-btn
              variant="text"
              download
              :href="document.fileSource"
              color="primary"
            >
              {{ $t("button.actions.download") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Documents",
  data() {
    return {
      documents: [
        {
          title: "Ley Eléctrica 1287 de 1975",
          description: "Ley que regula el uso de la energía en Cuba.",
          fileSource: "./LeyElectrica.pdf",
        },
        {
          title: "Res-277-2014 Tarifas no residenciales",
          description:
            "Resolución para el control de las tarifas energéticas no residenciales.",
          fileSource: "./02 Res-277-2014 Tarifas no residencial.pdf",
        },
        {
          title: "Res-152-2018 Manual de Inspección de Portadores Energéticos",
          description:
            "Manual para la realización de las inspecciones a los portadores energéticos.",
          fileSource:
            "./03 Res-152-2018 Manual de Insp Portadores Energeticos.pdf",
        },
        {
          title: "Metodología acomodo de carga",
          description:
            "Metodología para la confección de los estudios de control, regulación y acomodo de la carga energética.",
          fileSource: "./04 Metodologia acomodo de carga.pdf",
        },
        {
          title: "Dec-Ley 345-2019 Desarrollo energías renovables",
          description: "Ley para el desarrollo de energías renovables.",
          fileSource:
            "./05 Dec-Ley 345-2019 Desarrollo energias renovables.pdf",
        },
      ],
    };
  },
  methods: {
    openPdf(url) {
      window.open(url);
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 1368px) {
  .container {
    max-width: 1000px;
  }
}

@media screen and (min-width: 1668px) {
  .container {
    max-width: 1200px;
  }
}
</style>
