<template>
  <v-container :fluid="true">
    <app-plans-io-toolbar
      :excel-file="excelFile"
      :excel-name="excelName"
      @upload-complete="fromExcelToTable"
    />

    <a :href="excelFile" />

    <ag-grid-vue
      style="width: inherit; height: 32em;"
      class="ag-theme-material"
      :default-col-def="defaultColDef"
      :column-defs="columnDefs"
      :row-data="rowData"
      :quick-filter-text="search"
      :pagination="pagination"
      :pagination-page-size="rowAmount"
      :grid-options="gridOptions"
    />
  </v-container>
</template>

<script>
export default {
  name: 'PlanOneYear',
  data () {
    return {
      columnFields: [],
      excelName: 'Planes.xlsx',
      defaultColDef: null,
      gridOptions: {},
      gridApi: null,
      pagination: true,
      pageAmounts: [10, 50, 100],
      rowAmount: 10,
      rowData: [],
      rowHeight: 48,
      search: ''
    }
  },
  computed: {
    columnDefs () {
      return [
        {
          headerName: this.$t('plans.month'),
          field: 'month'
        },
        {
          headerName: this.$t('plans.total_plan'),
          field: 'planTotal'
        },
        {
          headerName: this.$t('plans.night'),
          field: 'night'
        },
        {
          headerName: this.$t('plans.day'),
          field: 'day'
        }
      ]
    },
    excelFile () {
      if (!this.rowData.length) {
        return ''
      }

      let headers = 'Mes;Plan Total;Nocturno;Diurno\n'

      let data = headers + this.getRowDataArray()

      data = data.replace('empty;empty;empty;empty\n', '')

      console.log('data')
      console.log(data)

      var parts = [
        new Blob([data], { type: 'text/csv' }),
        new Uint16Array([33])
      ]

      const excelFile = new File(parts, 'Planes.csv', { type: 'text/csv' })
      this.excelName = excelFile.name
      console.log(excelFile)

      const excelFileURL = URL.createObjectURL(excelFile)
      console.log(excelFileURL)
      return excelFileURL
    }
  },
  beforeMount () {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
  },
  methods: {
    getRowDataArray () {
      const rowDataArray = this.rowData.map(row => {
        return Object.values(row)
      })

      let rowDataString = ''

      for (const row of rowDataArray) {
        rowDataString += row.join(';')
        rowDataString += '\n'
      }
      return rowDataString
    },
    fromExcelToTable (tableData) {
      this.rowData = tableData.rowData
      this.gridApi.refreshCells()
    }
  }
}
</script>
