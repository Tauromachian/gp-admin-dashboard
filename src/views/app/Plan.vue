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
        </gen-toolbar>

        <easy-data-table
          class="mt-3"
          v-model:items-selected="selectedRows"
          :headers="visibleHeaders"
          :items="plans"
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
      <plan-form
        ref="form"
        v-model="form"
        :loading="loading"
        @submit="submitPlan"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

import { getPlans, addPlan, updatePlan } from "@/services/app/plan";

import PlanForm from "@/components/app/PlanForm.vue";

export default {
  name: "Plan",
  middleware: "auth",
  components: {
    PlanForm,
  },
  data() {
    return {
      formDialog: false,
      loading: false,
      isFormUpdating: false,

      selectedRows: [],
      itemsPerPage: 10,
      plans: [],

      visibleColumns: [
        "year",
        "year_plan",
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ],

      form: {
        year: "",
        january: "",
        february: "",
        march: "",
        april: "",
        may: "",
        june: "",
        july: "",
        august: "",
        september: "",
        october: "",
        november: "",
        december: "",
      },
    };
  },

  computed: {
    ...mapState("plan", ["serviceId", "services", "servicesImportantData"]),
    tableData() {
      return this.plans.map((row) => {
        const plan = {
          date: row.date,
        };
        return Object.assign(plan, row.planing);
      });
    },

    headers() {
      return [
        {
          text: `${this.$t("plans.year")}`,
          value: "year",
          checkboxSelection: true,
        },
        {
          text: `${this.$t("plans.total_plan")}`,
          value: "year_plan",
          checkboxSelection: true,
        },
        {
          text: `${this.$t("plans.months.january")}`,
          value: "january",
        },
        {
          text: `${this.$t("plans.months.february")}`,
          value: "february",
        },
        {
          text: `${this.$t("plans.months.march")}`,
          value: "march",
        },
        {
          text: `${this.$t("plans.months.april")}`,
          value: "april",
        },
        {
          text: `${this.$t("plans.months.may")}`,
          text: "MDD (kW)",
          value: "may",
        },
        {
          text: `${this.$t("plans.months.june")}`,
          text: "MDM (kW)",
          value: "june",
        },
        {
          text: `${this.$t("plans.months.july")}`,
          text: "MDM (kW)",
          value: "july",
        },
        {
          text: `${this.$t("plans.months.august")}`,
          text: "MDM (kW)",
          value: "august",
        },
        {
          text: `${this.$t("plans.months.september")}`,
          text: "MDM (kW)",
          value: "september",
        },
        {
          text: `${this.$t("plans.months.october")}`,
          text: "MDM (kW)",
          value: "october",
        },
        {
          text: `${this.$t("plans.months.november")}`,
          text: "MDM (kW)",
          value: "november",
        },
        {
          text: `${this.$t("plans.months.december")}`,
          text: "MDM (kW)",
          value: "december",
        },
        {
          text: this.$t("plan.fields.date"),
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
        this.plans = await getPlans();
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

    submitPlan() {
      this.isFormUpdating ? this.updatePlan() : this.insertPlan();
    },

    async insertPlan() {
      this.loading = true;

      try {
        await addPlan(this.form);
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

    async updatePlan() {
      this.loading = true;
      try {
        await updatePlan(this.selectedRows[0].id, this.form);
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
