// Utilities
import { createPinia } from "pinia";
import { markRaw } from "vue";
import router from "@/router";
import piniaPersist from "pinia-plugin-persist";

const pinia = createPinia();

pinia.use(piniaPersist);
pinia.use(({ store }) => (store.router = markRaw(router)));

export default pinia;
