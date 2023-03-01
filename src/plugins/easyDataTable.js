import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

export default function loadEasyDataTable(app) {
  app.component("EasyDataTable", Vue3EasyDataTable);
}
