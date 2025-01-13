// store/index.js
import { createStore } from "vuex";
import dashboard from "./modules/dashboard";
import portfolio from "./modules/portfolio"; 

const store = createStore({
  modules: {
    dashboard,
    portfolio,
  },
});

export default store;
