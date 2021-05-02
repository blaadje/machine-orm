import { createApp } from "vue";
import App from "./components/App";
import store from "@/core/store";

const app = createApp(App);

app.use(store);
app.mount("#app");
