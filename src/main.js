import App from "./App.vue";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

if (process.env.NODE_ENV !== "production") {
  const { makeServer } = await import("./mock-server");
  makeServer();
}

app.mount("#app");
app.config.unwrapInjectedRef = true;
