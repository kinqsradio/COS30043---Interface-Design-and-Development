import { createStore } from "vuex";
import dashboard from "./modules/dashboard"; // Ensure this path points to src/store/modules/dashboard.js

const store = createStore({
  modules: {
    dashboard, // Register the dashboard Vuex module
  },
});

export default store;
