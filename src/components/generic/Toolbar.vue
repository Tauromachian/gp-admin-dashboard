<template>
  <v-row>
    <v-col cols="auto">
      <slot name="actions-prepend" />

      <v-dialog
        v-if="!disable.hideColumns && !disable.details"
        v-model="columnSelectListDialog"
        width="500"
      >
        <template #activator>
          <v-btn
            icon="mdi-eye"
            @click="columnSelectListDialog = true"
            variant="text"
            color="primary"
          >
          </v-btn>
        </template>

        <v-card>
          <gen-column-select-list
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

      <v-btn
        variant="text"
        v-if="!disable?.edit"
        color="primary"
        @click="onOpenUpdateDialog"
        icon="mdi-pencil"
      >
      </v-btn>

      <gen-delete-confirmation-dialog
        v-if="!disable?.delete"
        v-model:delete-dialog-button="deleteDialogButtonComputed"
        @on-delete-button-clicked="deleteButtonClicked"
        @delete="deleteRow"
      />

      <slot name="actions-append" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    columnDefs: { type: Array, required: true },
    visibleColumns: { type: Array, required: true },
    selectedRows: { type: Array, default: () => [] },
    deleteDialogButton: { type: Boolean, default: false },
    disable: {
      type: Object,
      default: () => ({
        edit: false,
        delete: false,
        hideColumns: false,
        details: false,
      }),
    },
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
      this.$emit("click:delete-button");
    },
    deleteRow() {
      this.$emit("click:delete");
    },
    updateService() {
      this.$emit("update:service");
    },
    onOpenUpdateDialog() {
      this.$emit("click:update");
    },
  },
};
</script>
