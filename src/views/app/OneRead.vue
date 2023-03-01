<template>
  <v-container>
    <v-row wrap>
      <v-col>
        <v-card elevation="0">
          <v-row>
            <v-col cols="12">
              <v-card max-height="600" class="overflow-y-auto" elevation="0">
                <app-read-table
                  v-if="serviceId"
                  ref="table"
                  :service-id-for-reads="serviceId"
                  :service-name="serviceName"
                  class="pt-0 pb-0"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "pinia";
import { useServiceStore } from "@/stores/service";

export default {
  name: "OneRead",
  middleware: "auth",

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
      serviceId: null,
      serviceName: "",
    };
  },
  computed: {
    ...mapState(useServiceStore, ["services"]),
  },
  watch: {
    serviceId(id) {
      console.log(id);
      console.log(this.services);

      const service = this.services.find((service) => service.id === id);
      this.serviceName = service.name;
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.serviceId = Number(this.$route.params.idService);
    },
  },
};
</script>
