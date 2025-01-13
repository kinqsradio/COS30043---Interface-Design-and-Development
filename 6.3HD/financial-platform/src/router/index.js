import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "@/views/Dashboard.vue";
import PortfolioPage from "@/views/Portfolio.vue"; 


const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: PortfolioPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
