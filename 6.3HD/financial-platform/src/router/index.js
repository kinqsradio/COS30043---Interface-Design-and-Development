import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '@/views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
