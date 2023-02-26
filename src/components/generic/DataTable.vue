<template>
  <v-container fluid>
    <slot
      :search="search"
      :rowAmount="rowAmount"
      :rowHeight="rowHeight"
      :visibleColumns="visibleColumns"
      :setVisibleColumns="changeVisibleColumns"
      :deleteRow="deleteRow"
      :setRowHeight="setRowHeight"
      :setRowAmount="setRowAmount"
      :doSearch="doSearch"
    >
      <material-toolbar
        :search.sync="search"
        :row-amount.sync="rowAmount"
        :visible-columns.sync="visibleColumns"

        :column-defs="columnDefs"
        :row-height="rowHeight"
        @update:rowHeight="setRowHeight"
        @deleteRow="deleteRow"
      >
      </material-toolbar>
    </slot>

    <ag-grid-vue
      :style="style"
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
  name: 'DataTable',
  props: {
    width: {
      type: [Number, String],
      default: 'inherit'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    defaultColDef: { type: Object,
      default: () => ({
        sortable: true,
        resizable: true,
        filter: true,
        editable: true
      })
    },
    columnDefs: {
      type: Array,
      required: true
    },
    rowData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      gridOptions: {},
      gridApi: {},
      pagination: true,
      rowAmount: 10,
      rowHeight: '48',
      search: '',
      visibleColumns: [],
      columnFields: []
    }
  },
  computed: {
    style () {
      return `width: ${this.width}; height: ${this.height};`
    },
    selectedRows () {
      return this.gridApi.getSelectedRows()
    }
  },
  watch: {
    rowAmount: function (val) {
      this.gridApi.paginationSetPageSize(Number(val))
    },

    visibleColumns: function (val) {
      let difference = this.columnFields.filter(x => !val.includes(x))
      this.gridOptions.columnApi.setColumnsVisible(val, true)
      this.gridOptions.columnApi.setColumnsVisible(difference, false)
    }
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
    changeVisibleColumns: function (val) {
      this.visibleColumns = val
    },
    setColumnFields: function () {
      this.columnFields = this.columnDefs.map(element => {
        return element.field
      })
    },
    deleteRow: function () {
      const selectedRow = this.gridApi.getFocusedCell()
      if (selectedRow) {
        this.gridOptions.rowData.splice(selectedRow.rowIndex, 1)
        this.gridApi.setRowData(this.gridOptions.rowData)
      }
    },
    setRowHeight: function (val) {
      this.rowHeight = val
      this.gridOptions.rowHeight = Number(val)
      this.gridApi.resetRowHeights()
    },
    setRowAmount: function (val) {
      this.rowAmount = val
    },
    doSearch: function (val) {
      this.search = val
    }
  }
}
</script>
