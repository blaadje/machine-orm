import { createApp } from "vue";
import App from "./App.vue";
import store from "@/core/store";

const app = createApp(App);

console.log(app);

app.use(store);
app.mount("#app");
