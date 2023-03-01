/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import pinia from "../stores";
import router from "../router";
import i18n from "./i18n";
import loadComponents from "./componentsLoader";
import loadEasyDataTable from "./easyDataTable";

export function registerPlugins(app) {
  loadFonts();
  loadComponents(app);
  loadEasyDataTable(app);
  app.use(vuetify).use(pinia).use(router).use(i18n);
}
