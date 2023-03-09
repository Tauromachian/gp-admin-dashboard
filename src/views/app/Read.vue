<template>
  <v-container fluid>
    <v-card class="mt-4">
      <v-card-text>
        <gen-toolbar
          v-model:visible-columns="visibleColumns"
          :column-defs="headers"
          @plus-click="openFormForInsert"
          @edit-click="openFormForEdit"
        >
          <template #actions-append>
            <read-filter></read-filter>
          </template>
        </gen-toolbar>

        <easy-data-table
          class="mt-3"
          v-model:items-selected="selectedRows"
          :headers="visibleHeaders"
          :items="reads"
          :loading="loading"
          single-select
          show-select
        >
          <template #loading>
            <v-progress-circular
              color="primary"
              :size="60"
              :width="5"
              indeterminate
            ></v-progress-circular>
          </template>
        </easy-data-table>
      </v-card-text>
    </v-card>

    <gen-btn-add @click="openFormForInsert"></gen-btn-add>

    <v-dialog v-model="formDialog" width="400">
      <read-form
        ref="form"
        v-model="form"
        :loading="loading"
        @submit="submitRead"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import { getReads, addRead, updateRead } from "@/services/app/read";

import ReadFilter from "@/components/app/ReadFilter.vue";
import ReadForm from "@/components/app/ReadForm.vue";
import ReadToolbar from "@/components/app/ReadToolbar.vue";

export default {
  name: "Read",
  middleware: "auth",
  components: {
    ReadFilter,
    ReadForm,
    ReadToolbar,
  },
  data() {
    return {
      formDialog: false,
      loading: false,
      isFormUpdating: false,

      selectedRows: [],
      itemsPerPage: 10,
      reads: [],

      filters: {
        page: 1,
        limit: 10,
        pico: [1, 5],
        dia: [1, 5],
        madrugada: [1, 5],
        reactivo: [1, 5],
        mdp: [1, 5],
        mdd: [1, 5],
        mdm: [1, 5],
      },

      visibleColumns: [
        "T1IAE",
        "T2IAE",
        "T3IAE",
        "TIRE",
        "T1IMAXD",
        "T2IMAXD",
        "T3IMAXD",
        "date",
      ],

      form: {
        T1IAE: "",
        T2IAE: "",
        T3IAE: "",
        TIRE: "",
        T1IMAXD: "",
        T2IMAXD: "",
        T3IMAXD: "",
        date: "",
      },
    };
  },

  computed: {
    ...mapState("read", ["serviceId", "services", "servicesImportantData"]),
    tableData() {
      return this.reads.map((row) => {
        const read = {
          date: row.date,
        };
        return Object.assign(read, row.reading);
      });
    },

    headers() {
      return [
        {
          text: `${this.$t("read.fields.peak")} (kWh)`,
          value: "T1IAE",
          checkboxSelection: true,
          //   value: 'TLMT1IAE'
        },
        {
          text: `${this.$t("read.fields.day")} (kWh)`,
          value: "T2IAE",
          //   value: 'TLMT2IAE'
        },
        {
          text: `${this.$t("read.fields.morning")} (kWh)`,
          value: "T3IAE",
          //   value: 'TLMT3IAE'
        },
        {
          text: `${this.$t("read.fields.reactive")} (kVAr)`,
          value: "TIRE",
          //   value: 'TLMTIRE'
        },
        {
          text: "MDP (kW)",
          value: "T1IMAXD",
          //   value: 'TLMTT1IMAXD'
        },
        {
          text: "MDD (kW)",
          value: "T2IMAXD",
          //   value: 'TLMTT2IMAXD'
        },
        {
          text: "MDM (kW)",
          value: "T3IMAXD",
          //   value: 'TLMTT3IMAXD'
        },
        {
          text: this.$t("read.fields.date"),
          value: "date",
        },
      ];
    },
    visibleHeaders() {
      return this.headers.filter((header) =>
        this.visibleColumns.includes(header.value)
      );
    },
  },

  created() {
    this.loadData();
  },

  watch: {
    filters() {},
  },

  methods: {
    ...mapActions(useNotificationsStore, ["addNotification"]),

    async loadData() {
      this.loading = true;
      try {
        this.reads = await getReads();
      } catch (error) {
        this.addNotification({
          type: "error",
          message: error.message,
        });
      }
      this.loading = false;
    },

    openFormForInsert() {
      if (this.isFormUpdating) {
        this.$refs.form.reset();
        this.isFormUpdating = false;
      }
      this.formDialog = true;
    },

    openFormForEdit() {
      if (!this.isRowSelected("update")) return;

      this.fillForm();
      this.isFormUpdating = true;
      this.formDialog = true;
    },

    isRowSelected(type) {
      if (this.selectedRows.length !== 0) return true;

      this.addNotification({
        message: this.$t(
          type === "delete"
            ? "notifications.select_row_before_delete"
            : "notifications.select_row_before_update"
        ),
        color: "info",
      });

      return false;
    },

    submitRead() {
      this.isFormUpdating ? this.updateRead() : this.insertRead();
    },

    async insertRead() {
      this.loading = true;

      try {
        await addRead(this.form);
        this.formDialog = false;
        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
      }

      this.loading = false;
    },

    async updateRead() {
      this.loading = true;
      try {
        await updateRead(this.selectedRows[0].id, this.form);
        this.formDialog = false;
        this.addNotification({
          message: this.$t("notifications.succesfull_insert"),
          color: "success",
        });
      } catch (err) {
        this.addNotification({
          message: this.$t("notifications.unsuccesfull_insert"),
          color: "error",
        });
      }

      this.loading = false;
    },

    fillForm() {
      this.form = { ...this.selectedRows[0] };
    },
  },
};
</script>
