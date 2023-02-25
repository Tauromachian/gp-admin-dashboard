<template>
  <v-container :fluid="fluid">
    <app-toolbar
      :search.sync="search"
      :row-amount.sync="rowAmount"
      :visible-columns.sync="visibleColumns"
      :row-height.sync="rowHeight"

      :column-defs="columnDefs"
      @deleteRow="deleteRow"
    >
      <template #default="{closeUpdateDialog}">
        <app-service-form :enable-cancel="enableCancel"
                          :service-name="row.name"
                          :service-code="row.codcli"
                          :crf="row.crf"
                          :exclusive="row.exclusivo"
                          :alimentation="row.alimentacion"
                          :meter-number="row.meter_no"
                          :capacity="row.capacidad"
                          :metrage="row.metraje"
                          :tarif-type="row.tipo_tarifa"
                          :hired-demand="row.demanda"
                          :disabled="disabled"
                          @cancel="closeUpdateDialog"
                          @service-submit="updateRow"
        />
      </template>
    </app-toolbar>
    <ag-grid-vue
      style="width: inherit; height: 32em;"
      :default-col-def="defaultColDef"
      :column-defs=" columnDefs"
      :row-data="rowData"
      :quick-filter-text="search"
      :pagination="pagination"
      :pagination-page-size="rowAmount"
      :grid-options="gridOptions"
      class="ag-theme-material"
    />
  </v-container>
</template>

<script>
import { api } from '~/config'
import axios from 'axios'

export default {
  name: 'UserTable',
  data () {
    return {
      disabled: false,
      enableCancel: true,
      columnFields: [],
      defaultColDef: null,
      dialog: false,
      serviceFormDialog: false,
      fluid: true,
      gridOptions: {},
      gridApi: null,
      pagination: true,
      pageAmounts: [10, 50, 100],
      rowAmount: 10,
      rowData: [],
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
          headerName: this.$t('users.fields.name'),
          field: 'name',
          checkboxSelection: true
        },
        {
          headerName: this.$t('users.fields.last_name'),
          field: 'last_name'
        },
        {
          headerName: this.$t('users.fields.user_name'),
          field: 'user_name'
        },
        {
          headerName: this.$t('users.fields.phone'),
          field: 'phone'
        },
        {
          headerName: this.$t('users.fields.email'),
          field: 'email'
        },
        {
          headerName: this.$t('users.fields.institution'),
          field: 'institution'
        },
        {
          headerName: this.$t('users.fields.rol'),
          field: 'rol'
        }, {
          headerName: this.$t('users.fields.position'),
          field: 'position'
        }
      ]
    }
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
    this.defaultColDef = {
      sortable: true,
      resizable: true,
      filter: true,
      editable: true
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.setVisibleColumns()
    this.setColumnFields()
    this.fetchServices()
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
      if (!selectedRow) {
        // A notification here
        return
      }

      const id = this.gridOptions.rowData[selectedRow.rowIndex].id

      const url = `${api.path('service')}/${id}`

      axios.delete(url).then(res => {
        this.gridOptions.rowData.splice(selectedRow.rowIndex, 1)
        this.gridApi.setRowData(this.gridOptions.rowData)
      }
      ).catch(err => {
        console.log(err)
      })
    },
    fillForm: function () {
      const selectedRow = this.gridApi.getFocusedCell()
      if (!selectedRow) {
        // A notification here
        return
      }
      const rowIndex = selectedRow.rowIndex

      const rowData = this.gridOptions.rowData[rowIndex]

      this.row = rowData

      if (rowData.exclusivo) {
        this.row.exclusivo = true
      } else {
        this.row.exclusivo = false
      }
    },
    updateRow: function (form) {
      const selectedRow = this.gridApi.getFocusedCell()
      if (!selectedRow) {
        // A notification here
        return
      }

      const id = this.gridOptions.rowData[selectedRow.rowIndex].id

      const url = `${api.path('service')}/${id}`

      this.disabled = true
      axios.patch(url, {
        'name': form.serviceNameComputed,
        'demanda': form.hiredDemandComputed,
        'crf': form.crfComputed,
        'exclusivo': form.exclusiveComputed,
        'tipo_tarifa': form.tarifTypeComputed,
        'turnos': form.turnComputed,
        'alimentacion': form.alimentationComputed,
        'meter_no': form.meterNumberComputed,
        'metraje': form.metrageComputed,
        'capacidad': form.capacityComputed,
        'device_token': 'string',
        'codcli': form.serviceCodeComputed
      }).then(res => {
        this.disabled = false
      }).catch(err => {
        console.log(err)
        this.disabled = false
      })
    },
    fetchServices: function () {
      axios.get(api.path('service'))
        .then(res => {
          this.rowData = res.data
        }).catch(err => {
          console.log(err)
        })
    },
    closeUpdateServiceDialog: function () {
      this.serviceFormDialog = false
    }
  }
}
</script>

<style scoped>

</style>
