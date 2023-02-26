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
import loadComponents from "./componentsLoader";

export function registerPlugins(app) {
  loadFonts();
  loadComponents(app);
  app.use(vuetify).use(pinia).use(router);
}
