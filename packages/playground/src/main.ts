import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers";
import "mc-plus/dist/index.css";

createApp(App).use(router).mount("#app");
