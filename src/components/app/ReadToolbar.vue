<template>
  <material-toolbar
    :row-amount.sync="rowAmount"
    :visible-columns.sync="visibleColumnsComputed"
    :column-defs="columnDefs"
    disable-delete
    :dense.sync="denseComputed"
    @on-open-update-dialog="onEditClicked"
  >
    <template #actions-prepend>
      <v-btn color="primary" @click="onPlusClicked">
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>
    <template #actions-append>
      <material-time-period-filter-menu
        :start-date.sync="startDate"
        :finish-date.sync="finishDate"
      />
    </template>
  </material-toolbar>
</template>

<script>
export default {
  name: 'ReadToolbar',
  props: {
    columnDefs: { type: Array, required: true },
    search: { type: String, default: '' },
    rowAmount: { type: Number, default: 10 },
    visibleColumns: { type: Array, required: true },
    selectedRows: { type: Array, default: () => [] }
  },
  data () {
    return {
      startDate: '',
      finishDate: '',
      columnSelectListDialog: false,
      formDialog: false,
      pageAmounts: [10, 50, 100]
    }
  },

  computed: {
    denseComputed: {
      get () {
        return this.dense
      },
      set (val) {
        this.$emit('update:dense', val)
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
    },
    visibleColumnsComputed: {
      get () {
        return this.visibleColumns
      },
      set (val) {
        this.$emit('update:visibleColumns', val)
      }
    }
  },
  methods: {
    onPlusClicked () {
      this.$emit('plus-click')
    },
    onEditClicked () {
      this.$emit('edit-click')
    }
  }
}
</script>
