<script>
import { h } from "vue";

import {
  VList,
  VListItem,
  VListItemTitle,
  VListSubheader,
  VCheckboxBtn,
} from "vuetify/components";

export default {
  name: "ColumnSelectList",

  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      visibleColumns: [],
    };
  },
  beforeMount() {
    this.visibleColumns = this.columns.map((column) => {
      if (column.children) {
        let children = this.getChildrenFields(column);
        return children;
      } else if (this.modelValue.includes(column.value)) {
        return column.value;
      }
    });
  },
  methods: {
    setTableVisibleColumns(listSelectedColumns) {
      const tableSelectedColumns = listSelectedColumns.flatMap(
        (columnField) => {
          columnField = columnField.split(",");
          return columnField.map((column) => {
            return column.trim();
          });
        }
      );

      this.$emit("update:modelValue", tableSelectedColumns);
    },
    makeList(h) {
      const vListItems = this.columns.map((column) => {
        if (column.children) {
          let fields = this.getChildrenFields(column);
          return this.makeListItem(h, column, fields);
        } else {
          return this.makeListItem(h, column, column.value);
        }
      });

      return vListItems;
    },
    makeListItem(h, column) {
      return h(
        VListItem,
        {
          value: column.value,
        },
        {
          prepend: ({ isActive }) => h(VCheckboxBtn, { modelValue: isActive }),
          default: () => h(VListItemTitle, {}, { default: () => column.text }),
        }
      );
    },

    getChildrenFields(parent) {
      let fieldString = "";
      fieldString += parent.children[0].value;

      for (let i = 1; i < parent.children.length; i++) {
        fieldString += ", " + parent.children[i].value;
      }
      return fieldString;
    },
  },
  render() {
    const vListItems = this.makeList(h);

    return h(
      VList,
      { flat: true, selectStrategy: "classic" },
      {
        default: () => [
          h(VListSubheader, () => "Seleccione las columnas a mostrar"),
          vListItems,
        ],
      }
    );
  },
};
</script>
