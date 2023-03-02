<template>
  <v-container>
    <v-card elevation="0" class="mt-4 hidden-sm-and-down">
      <v-row>
        <v-col cols="12" md="8" lg="8">
          <v-card max-height="600" class="overflow-y-auto" elevation="0">
            <app-read-table
              v-for="serviceSelected in selection"
              :key="serviceSelected.id"
              ref="table"
              :service-id-for-reads="serviceSelected.id"
              :service-name="serviceSelected.name"
              class="pt-0 pb-0"
            />
          </v-card>
        </v-col>

        <v-divider vertical class="ml-0 mr-0" />

        <v-col cols="12" md="3" lg="3" class="pl-0 pr-0">
          <app-read-service-filter v-model="selection" />
        </v-col>
      </v-row>
    </v-card>
    <read-filter v-model="selection"></read-filter>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "pinia";

import ReadFilter from "@/components/app/ReadFilter.vue";

export default {
  name: "Read",
  middleware: "auth",
  components: {
    ReadFilter,
  },
  data() {
    return {
      selection: [],
      formDialog: false,
      deleteDialogButton: false,
      loading: false,
      columnFields: [],
      defaultColDef: null,
      dialog: false,
      pagination: true,
      codcli: {},
    };
  },
  computed: {
    ...mapState("read", ["servicesImportantData"]),
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions("read", ["setServicesImportantData"]),
    loadData() {
      const id = this.$route.params.id;
      this.fetchServicesImportantData(id);
    },
    fetchServicesImportantData(id) {
      axios
        .get(`/api/v1/service?institution=${id},select=id,codcli,name&limit=10`)
        .then(({ data }) => {
          this.setServicesImportantData(data.data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
