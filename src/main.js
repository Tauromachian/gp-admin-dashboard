import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";
import { makeServer } from "./mock-server";

const app = createApp(App);

registerPlugins(app);

if (process.env.NODE_ENV !== "production") {
  makeServer();
}

app.mount("#app");
