<template>
  <v-container>
    <v-row>
      <v-col md="12" sm="12">
        <app-plan-table-toolbar>
          <template #default="{ closeBalanceDialog }">
            <app-plan-form>
              <template #form-actions="{ planSubmit }">
                <app-form-actions
                  :loading-buttons="loading"
                  :enable-cancel="true"
                  @on-submit="planSubmit"
                  @on-cancel="closeBalanceDialog"
                />
              </template>
            </app-plan-form>
          </template>
        </app-plan-table-toolbar>
      </v-col>
      <v-col md="12">
        <ag-grid-vue
          style="width: inherit; height: 500px;"
          class="ag-theme-material"
          :default-col-def="defaultColDef"
          :column-defs="columnDefs"
          :row-data="rowData"
          :quick-filter-text="search"
          :pagination="pagination"
          :pagination-page-size="rowAmount"
          :grid-options="gridOptions"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PlanInstitutionTable',
  data: function () {
    return {
      rowData: [],
      search: '',
      defaultColDef: null,
      gridOptions: {},
      gridApi: null,
      pagination: true,
      pageAmounts: [10, 50, 100],
      rowAmount: 10,
      rowHeight: 48,
      search: '',
      visibleColumns: [],
      row: {}
    }
  },
  computed: {
    columnDefs () {
      return [
        {
          headerName: this.$t('plans.year'),
          field: 'year'
        },
        {
          headerName: 'Plan',
          field: 'plan'
        }
      ]
    }
  },
  beforeMount () {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      editable: true
    }

    this.rowData = [
      { service: 'Planta Piloto', clientCode: '330' },
      { service: '900', clientCode: '340' },
      { service: 'C1', clientCode: '342' },
      { service: 'C2', clientCode: '343' },
      { service: 'C3', clientCode: '344' }
    ]
  }
}
</script>
