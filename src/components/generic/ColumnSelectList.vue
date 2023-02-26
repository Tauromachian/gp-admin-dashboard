<script>
import {
  VList,
  VSubheader,
  VListItemGroup,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VCheckbox,
  VListItemAction
} from 'vuetify/lib'

export default {
  name: 'ColumnSelectList',
  components: {
    'v-list': VList,
    'v-subheader': VSubheader,
    'v-list-item-group': VListItemGroup,
    'v-list-item': VListItem,
    'v-list-item-action': VListItemAction,
    'v-list-item-content': VListItemContent,
    'v-list-item-title': VListItemTitle,
    'v-checkbox': VCheckbox
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      visibleColumns: []
    }
  },
  beforeMount () {
    this.visibleColumns = this.columns.map(column => {
      if (column.children) {
        let children = this.getChildrenFields(column)
        return children
      } else if (this.value.includes(column.value)) {
        return column.value
      }
    })
  },
  methods: {
    setTableVisibleColumns (listSelectedColumns) {
      const tableSelectedColumns = listSelectedColumns.flatMap(columnField => {
        columnField = columnField.split(',')
        return columnField.map(column => {
          return column.trim()
        })
      })

      this.$emit('input', tableSelectedColumns)
    },
    makeList: function (h) {
      const vListItems = this.columns.map(column => {
        if (column.children) {
          let fields = this.getChildrenFields(column)
          return this.makeListItem(h, column, fields)
        } else {
          return this.makeListItem(h, column, column.value)
        }
      })

      return vListItems
    },
    makeListItem (h, column, value) {
      return h('v-list-item', { attrs: { value },
        scopedSlots: {
          default: scope => {
            return this.makeListItemContent(
              h,
              scope.active,
              scope.toggle,
              column
            )
          }
        } })
    },
    makeListItemContent (h, active, toggle, column) {
      return [
        h('v-list-item-action', [
          h('v-checkbox', { attrs: { color: 'primary', inputValue: active }, on: { click: toggle } })
        ]),
        h('v-list-item-content', [
          h('v-list-item-title', column.text)
        ])
      ]
    },
    getChildrenFields (parent) {
      let fieldString = ''
      fieldString += parent.children[0].value

      for (let i = 1; i < parent.children.length; i++) {
        fieldString += ', ' + parent.children[i].value
      }
      return fieldString
    }
  },
  render: function (h) {
    const vListItems = this.makeList(h)

    return h(
      'v-list', { attrs: { flat: true } }, [
        h('v-subheader', 'Selecciona las columnas a mostrar'),
        h('v-list-item-group',
          { attrs: { multiple: true, value: this.visibleColumns }, on: { change: this.setTableVisibleColumns } },
          vListItems
        )
      ]
    )
  }
}
</script>
