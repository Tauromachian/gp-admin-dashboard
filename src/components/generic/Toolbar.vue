<template>
  <v-row>
    <v-col cols="auto">
      <slot name="actions-prepend" />
      <v-dialog
        v-if="!disableHideColumnsDialog && !disableDetails"
        v-model="columnSelectListDialog"
        width="500"
      >
        <template #activator="{ on }">
          <v-btn color="primary" v-on="on">
            <v-icon dark> mdi-eye </v-icon>
          </v-btn>
        </template>

        <v-card>
          <material-column-select-list
            v-model="visibleColumnsComputed"
            :columns="columnDefs"
          />

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="columnSelectListDialog = false">
              {{ $t("button.actions.accept") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn v-if="!disableEdit" color="primary" @click="onOpenUpdateDialog">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>

      <material-delete-confirmation-dialog
        v-if="!disableDelete"
        v-model:delete-dialog-button="deleteDialogButtonComputed"
        @on-delete-button-clicked="deleteButtonClicked"
        @delete="deleteRow"
      />
      <slot name="actions-append" />
    </v-col>
    <v-col md="1">
      <v-btn-toggle v-model="denseComputed" group mandatory>
        <v-btn :value="false">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn :value="true">
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-dialog v-model="formDialog" width="900">
      <slot :closeUpdateDialog="closeUpdateDialog" />
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    disableHideColumnsDialog: { type: Boolean, default: false },
    columnDefs: { type: Array, required: true },
    dense: { type: Boolean, default: false },
    visibleColumns: { type: Array, required: true },
    selectedRows: { type: Array, default: () => [] },
    deleteDialogButton: { type: Boolean, default: false },
    disableEdit: { type: Boolean, default: false },
    disableDelete: { type: Boolean, default: false },
    disableDetails: { type: Boolean, default: false },
  },
  data() {
    return {
      columnSelectListDialog: false,
      formDialog: false,
      pageAmounts: [10, 50, 100],
    };
  },

  computed: {
    deleteDialogButtonComputed: {
      get() {
        return this.deleteDialogButton;
      },
      set(val) {
        this.$emit("update:delete-dialog-button", val);
      },
    },
    denseComputed: {
      get() {
        return this.dense;
      },
      set(val) {
        this.$emit("update:dense", val);
      },
    },
    visibleColumnsComputed: {
      get() {
        return this.visibleColumns;
      },
      set(val) {
        this.$emit("update:visibleColumns", val);
      },
    },
  },

  methods: {
    deleteButtonClicked() {
      this.$emit("on-delete-button-clicked");
    },
    deleteRow() {
      this.$emit("delete-row");
    },
    updateService() {
      this.$emit("update:service");
    },
    closeUpdateDialog() {
      this.formDialog = false;
    },
    openUpdateDialog() {
      this.formDialog = true;
    },
    onOpenUpdateDialog() {
      this.$emit("on-open-update-dialog", this.openUpdateDialog);
    },
  },
};
</script>
