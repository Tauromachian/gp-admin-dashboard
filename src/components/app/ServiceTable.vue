<template>
  <v-container :fluid="fluid">
    <v-row>
      <v-col md="2">
        <v-btn color="primary" @click="deleteRow">{{ $t('services.table.delete_column') }}</v-btn>
      </v-col>

      <v-col md="2">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">{{ $t('services.table.columns') }}</v-btn>
          </template>

          <v-card>
            <app-column-select-list :columns="columnDefs" v-model="visibleColumns" />

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">{{ $t('services.table.accept') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col md="1">
        <v-select v-model="rowAmount" :items="pageAmounts" :label="$t('services.table.rows')"></v-select>
      </v-col>

      <v-col md="4">
        <v-text-field
          v-model="search"
          :label="$t('search')"
          single-line
          hide-details
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-btn-toggle v-model="rowHeight" group mandatory>
          <v-btn value="48">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn value="24">
            <v-icon>mdi-format-align-justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <ag-grid-vue
      style="width: inherit; height: 500px;"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :quickFilterText="search"
      :pagination="pagination"
      :paginationPageSize="rowAmount"
      :gridOptions="gridOptions"
      class="ag-theme-material"
    ></ag-grid-vue>
  </v-container>
</template>

<script>
export default {
  name: 'ServiceTable',
  data () {
    return {
      columnDefs: [],
      columnFields: [],
      defaultColDef: null,
      dialog: false,
      fluid: true,
      gridOptions: {},
      gridApi: null,
      pagination: true,
      pageAmounts: [10, 50, 100],
      rowAmount: 10,
      rowHeight: 48,
      search: '',
      visibleColumns: []
    };
  },

  watch: {
    rowAmount: function (val) {
      this.gridApi.paginationSetPageSize(Number(val))
    },
    rowHeight: function (val) {
      this.gridOptions.rowHeight = Number(val)
      this.gridApi.resetRowHeights()
    },
    visibleColumns: function (val) {
      let difference = this.columnFields.filter(x => !val.includes(x))
      this.gridOptions.columnApi.setColumnsVisible(val, true)
      this.gridOptions.columnApi.setColumnsVisible(difference, false)
    }
  },

  beforeMount () {
    this.columnDefs = [
      {
        headerName: this.$t('services.service'),
        field: 'service',
        checkboxSelection: true
      },
      {
        headerName: 'CRF',
        field: 'clientCode'
      },
      {
        headerName: this.$t('services.table.code'),
        field: 'price'
      },
      {
        headerName: this.$t('services.table.code') + '1',
        field: 'price1'
      },
      {
        headerName: this.$t('services.table.code') + '2',
        field: 'price2'
      }
    ]
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      editable: true
    }

    this.rowData = [
      { service: "Planta Piloto", clientCode: "330", price: 35000 },
      { service: "900", clientCode: "340", price: 32000 },
      { service: "C1", clientCode: "342", price: 71000 },
      { service: "C2", clientCode: "343", price: 52000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 },
      { service: "C3", clientCode: "344", price: 12000 }
    ]
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.setVisibleColumns()
    this.setColumnFields()
  },
  methods: {
    setVisibleColumns: function () {
      this.visibleColumns = this.columnDefs.map(element => {
        if (this.gridOptions.columnApi.getColumn(element.field).visible) {
          return element.field
        }
      })
    },
    setColumnFields: function () {
      this.columnFields = this.columnDefs.map(element => {
        return element.field
      })
    },
    deleteRow: function () {
      const selectedRow = this.gridApi.getFocusedCell()
      this.gridOptions.rowData.splice(selectedRow.index, 1)
      this.gridApi.setRowData(this.gridOptions.rowData)
    }
  }
}
</script>
