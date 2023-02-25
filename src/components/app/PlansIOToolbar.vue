<template>
  <v-row>
    <v-col md="1">
      <v-btn :download="excelName" :href="excelFile" color="primary" @click="downloadFile">
        <v-icon dark>
          mdi-download
        </v-icon>
      </v-btn>
    </v-col>
    <v-col md="3">
      <v-file-input @change="uploadFile" prepend-icon="mdi-upload-outline"/>
      <xlsx-read :file="file" @parsed="parsedFile" />
    </v-col>

    <v-col md="1">
      <v-select v-model="setRowAmount" :items="pageAmounts" :label="$t('services.table.rows')" />
    </v-col>

    <v-col md="4">
      <v-text-field
        v-model="doSearch"
        :label="$t('search')"
        single-line
        hide-details
        append-icon="mdi-magnify"
      />
    </v-col>
    <v-col md="1">
      <v-btn-toggle v-model="setRowHeight" group mandatory>
        <v-btn value="48">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn value="24">
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
import { isNumber, isMonthInSpanish } from '~/helpers/regex'
import { XlsxRead } from 'vue-xlsx/dist/vue-xlsx.es'
import XLSX from 'xlsx'

export default {
  name: 'Toolbar',
  components: {
    XlsxRead
  },
  props: {
    excelName: { type: String},
    excelFile: { type: String },
    search: { type: String, default: '' },
    rowAmount: { type: Number, default: 10 },
    rowHeight: { type: [String, Number], default: '48' },
    selectedRows: { type: Array, default: () => [] },
    deleteDialogButton: { type: Boolean, default: false }
  },
  data () {
    return {
      columnSelectListDialog: false,
      formDialog: false,
      pageAmounts: [10, 50, 100],
      file: null
    }
  },

  computed: {
    setRowHeight: {
      get () {
        return this.rowHeight
      },
      set (val) {
        this.$emit('update:rowHeight', val)
      }
    },
    setRowAmount: {
      get () {
        return this.rowAmount
      },
      set (val) {
        this.$emit('update:rowAmount', Number(val))
      }
    },
    doSearch: {
      get () {
        return this.search
      },
      set (val) {
        this.$emit('update:search', val)
      }
    }
  },

  methods: {
    downloadFile () {
      this.$emit('download-click')
    },
    async uploadFile (file) {
      this.file = file
    },
    parsedFile (workbook) {
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]]

      var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 })

      data = data.filter(row => row.length)

      const tableData = this.toTableFormat(data)
      this.formatEnd(tableData)
    },
    toTableFormat (data) {
      data.shift()
      let total = {
        plantTotal: 0,
        nightTotal: 0,
        dayTotal: 0
      }

      let rowData = []

      for (const row of data) {
        rowData.push(this.testRowData(row))
        total.plantTotal += row[1]
        total.nightTotal += row[2]
        total.dayTotal += row[3]
      }

      return { rowData, total }
    },
    testRowData (row) {
      if (isMonthInSpanish(row[0])) {
        return {
          month: row[0],
          planTotal: Math.round(this.checkOrTransformToNumber(row[1])),
          night: Math.round(this.checkOrTransformToNumber(row[2])),
          day: Math.round(this.checkOrTransformToNumber(row[3]))
        }
      }
      return {
        month: 'empty',
        planTotal: 'empty',
        night: 'empty',
        day: 'empty'
      }
    },

    checkOrTransformToNumber (rowElement) {
      if (isNumber(rowElement)) {
        return rowElement
      }

      const casted = Number(rowElement)
      return casted
    },

    formatEnd (tableData) {
      this.$emit('upload-complete', tableData)
    }
  }
}
</script>
