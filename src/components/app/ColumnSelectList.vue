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
} from "vuetify/lib";

export default {
  name: "ColumnSelectList",
  components: {
    "v-list": VList,
    "v-subheader": VSubheader,
    "v-list-item-group": VListItemGroup,
    "v-list-item": VListItem,
    "v-list-item-action": VListItemAction,
    "v-list-item-content": VListItemContent,
    "v-list-item-title": VListItemTitle,
    "v-checkbox": VCheckbox
  },
  data: function() {
    return {
      visibleColumns: []
    };
  },
  props: {
    value: Array,
    columns: Array
  },
  
  // eslint-disable-next-line no-unused-vars
  render: function(h) {
    const vListItems = this.makeList();

    return (`
      <v-list flat>
        <v-subheader>Selecciona las columnas a mostrar</v-subheader>
        <v-list-item-group
          multiple
          value={this.visibleColumns}
          onChange={this.setTableVisibleColumns}
        >
          {vListItems}
        </v-list-item-group>
      </v-list>
    `);
  },
  methods: {
    setTableVisibleColumns(listSelectedColumns) {
      const tableSelectedColumns = listSelectedColumns.flatMap(columnField => {
        columnField = columnField.split(",");
        return columnField.map(column => {
          return column.trim();
        });
      });

      this.$emit("input", tableSelectedColumns);
    },
    makeList() {
      const vListItems = this.columns.map(column => {
        if (column.children) {
          let fields = this.getChildrenFields(column);
          return this.makeListItem(column, fields);
        } else {
          return this.makeListItem(column, column.field);
        }
      });

      return vListItems;
    },
    makeListItem(column, field) {
      return (
        `<v-list-item
          value={field}
          {...{
            scopedSlots: {
              default: scope => {
                return this.makeListItemContent(
                  scope.active,
                  scope.toggle,
                  column
                );
              }
            }
          }}
        ></v-list-item>`
      );
    },
    makeListItemContent(active, toggle, column) {
      return [
        `<v-list-item-action>
          <v-checkbox
            color="primary"
            onClick={toggle}
            vModel={active}
          ></v-checkbox>
        </v-list-item-action>,
        <v-list-item-content>
          <v-list-item-title>{column.headerName}</v-list-item-title>
        </v-list-item-content>`
      ];
    },
    getChildrenFields(parent) {
      let fieldString = "";
      fieldString += parent.children[0].field;

      for (let i = 1; i < parent.children.length; i++) {
        fieldString += ", " + parent.children[i].field;
      }
      return fieldString;
    }
  },
  beforeMount() {
    this.visibleColumns = this.columns.map(column => {
      if (column.children) {
        let children = this.getChildrenFields(column);
        return children;
      } else if (this.value.includes(column.field)) {
        return column.field;
      }
    });
  }
};
</script>