<template>
  <v-container :fluid="fluid">
    <v-row>
      <v-col md="2"></v-col>

      <v-col md="2">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">Columnas</v-btn>
          </template>

          <v-card>
            <app-column-select-list :columns="columnDefs" v-model="visibleColumns" />

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Aceptar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col md="1">
        <v-select v-model="rowAmount" :items="pageAmounts" label="Filas"></v-select>
      </v-col>

      <v-col md="5">
        <v-text-field
          v-model="search"
          label="Buscar"
          single-line
          hide-details
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col md="2">
        <v-btn-toggle group mandatory v-model="rowHeight">
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
      class="ag-theme-material"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :quickFilterText="search"
      :pagination="pagination"
      :paginationPageSize="rowAmount"
      :gridOptions="gridOptions"
    ></ag-grid-vue>
  </v-container>
</template>

<script>
export default {
  name: "PlansTable",
  data() {
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
      search: "",
      visibleColumns: []
    };
  },
  beforeMount() {
    (this.columnDefs = [
      {
        lockPosition: true,
        headerName: "Servicio",
        field: "service",
        suppressNavigable: true,
        suppressMovable: true,
        editable: false
      },
      {
        lockPosition: true,
        headerName: "CodCli",
        field: "clientCode",
        suppressMovable: true,
        editable: false
      },
      {
        headerName: "Price",
        field: "price"
      },
      {
        headerName: "Enero",
        children: [
          {
            headerName: "Plan",
            field: "planJanuary"
          },
          {
            headerName: "Pico",
            field: "planPikeJanuary"
          }
        ]
      },
      {
        headerName: "Febrero",
        children: [
          {
            headerName: "Plan",
            field: "planFebrary"
          },
          {
            headerName: "Pico",
            field: "planPikeFebrary"
          }
        ]
      },
      {
        headerName: "Marzo",
        children: [
          {
            headerName: "Plan",
            field: "planMarch"
          },
          {
            headerName: "Pico",
            field: "planPikeMarch"
          }
        ]
      },
      {
        headerName: "Abril",
        children: [
          {
            headerName: "Plan",
            field: "planApril"
          },
          {
            headerName: "Pico",
            field: "planPikeApril"
          }
        ]
      },
      {
        headerName: "Mayo",
        children: [
          {
            headerName: "Plan",
            field: "planMay"
          },
          {
            headerName: "Pico",
            field: "planPikeMay"
          }
        ]
      },
      {
        headerName: "Junio",
        children: [
          {
            headerName: "Plan",
            field: "planJune"
          },
          {
            headerName: "Pico",
            field: "planPikeJune"
          }
        ]
      },
      {
        headerName: "Julio",
        children: [
          {
            headerName: "Plan",
            field: "planJule"
          },
          {
            headerName: "Pico",
            field: "planPikeJule"
          }
        ]
      },
      {
        headerName: "Agosto",
        children: [
          {
            headerName: "Plan",
            field: "planAgost"
          },
          {
            headerName: "Pico",
            field: "planPikeAgost"
          }
        ]
      },
      {
        headerName: "Septiembre",
        children: [
          {
            headerName: "Plan",
            field: "planSeptember"
          },
          {
            headerName: "Pico",
            field: "planPikeSeptember"
          }
        ]
      },
      {
        headerName: "Octubre",
        children: [
          {
            headerName: "Plan",
            field: "planOctober"
          },
          {
            headerName: "Pico",
            field: "planPikeOctober"
          }
        ]
      },
      {
        headerName: "Noviembre",
        children: [
          {
            headerName: "Plan",
            field: "planNovember"
          },
          {
            headerName: "Pico",
            field: "planPikeNovember"
          }
        ]
      },
      {
        headerName: "Diciembre",
        children: [
          {
            headerName: "Plan",
            field: "planDecember"
          },
          {
            headerName: "Pico",
            field: "planPikeDecember"
          }
        ]
      }
    ]),
      (this.defaultColDef = {
        sortable: true,
        resizable: true,
        filter: true,
        editable: true
      });

    this.rowData = [
      { service: "Planta Piloto", clientCode: "330", price: 35000 },
      { service: "900", clientCode: "340", price: 32000 },
      { service: "C1", clientCode: "342", price: 71000 },
      { service: "C2", clientCode: "343", price: 52000 },
      { service: "C3", clientCode: "344", price: 12000 }
    ];
  },
  methods: {
    setVisibleColumns: function() {
      const columnFields = this.columnDefs.flatMap(column => {
        return this.getColumnFieldsRecursive(column);
      });

      this.visibleColumns = columnFields.map(column => {
        if (this.gridOptions.columnApi.getColumn(column).visible) {
          return column;
        }
      });
    },
    setColumnFields: function() {
      this.columnFields = this.columnDefs.flatMap(column =>
        this.getColumnFieldsRecursive(column)
      );
    },
    getColumnFieldsRecursive: function(column) {
      if (!column.children) {
        return column.field;
      }
      return column.children.map(this.getColumnFieldsRecursive);
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.setVisibleColumns();
    this.setColumnFields();
  },
  watch: {
    rowAmount: function(val) {
      this.gridApi.paginationSetPageSize(Number(val));
    },
    rowHeight: function(val) {
      this.gridOptions.rowHeight = Number(val);
      this.gridApi.resetRowHeights();
    },
    visibleColumns: function(val) {
      let difference = this.columnFields.filter(x => !val.includes(x));
      this.gridOptions.columnApi.setColumnsVisible(val, true);
      this.gridOptions.columnApi.setColumnsVisible(difference, false);
    }
  }
};
</script>
