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
            <v-btn color="primary" @click="columnSelectListDialog = false">
              {{ $t("button.actions.accept") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn
        class="ml-1"
        v-if="!disable?.edit"
        color="primary"
        @click="onUpdateButtonClicked"
        icon="mdi-pencil"
      >
      </v-btn>

      <gen-delete-confirmation-dialog
        class="mx-1"
        v-if="!disable?.delete"
        v-model="dialogDelete"
        :isAllowedToOpen="isRowSelected"
        @click:delete-button="onDeleteButtonClicked"
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
    isRowSelected: { type: Boolean, default: false },
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
      dialogDelete: false,
      formDialog: false,
      pageAmounts: [10, 50, 100],
    };
  },

  computed: {
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
    onDeleteButtonClicked() {
      this.$emit("click:delete-button");
    },
    onUpdateButtonClicked() {
      this.$emit("click:update-button");
    },
    deleteRow() {
      this.$emit("click:delete");
    },
  },
};
</script>
