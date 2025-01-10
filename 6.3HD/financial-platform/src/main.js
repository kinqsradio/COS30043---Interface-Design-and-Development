import { createApp } from "vue";
import App from "./App.vue"; // Ensure this path points to the root-level App.vue
import router from "./router"; // Import router from src/router/index.js
import store from "./store"; // Import store from src/store/index.js
import "bootstrap/dist/css/bootstrap.min.css";


const app = createApp(App);

app.use(router); // Register the Vue Router
app.use(store); // Register the Vuex Store
app.mount("#app");
