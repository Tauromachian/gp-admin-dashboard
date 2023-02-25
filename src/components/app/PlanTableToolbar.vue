<template>
  <v-row>
    <v-col md="1">
      <v-btn color="primary" @click="onOpenBalanceDialog">
        <v-icon dark>
          mdi-scale-balance
        </v-icon>
      </v-btn>
      <v-dialog v-model="formDialog" width="900">
        <slot :closeBalanceDialog="closeBalanceDialog" />
      </v-dialog>
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
export default {
  name: 'Toolbar',
  props: {
    disableHideColumnsDialog: { type: Boolean, default: false },
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
      pageAmounts: [10, 50, 100]
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
    setVisibleColumns: {
      get () {
        return this.visibleColumns
      },
      set (val) {
        this.$emit('update:visibleColumns', val)
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
    closeBalanceDialog () {
      this.formDialog = false
    },
    openBalanceDialog () {
      this.formDialog = true
    },
    onOpenBalanceDialog () {
      this.$emit('onOpenUpdateDialog', this.openBalanceDialog)
    }
  }
}
</script>
