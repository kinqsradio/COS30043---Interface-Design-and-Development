import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Units from '../views/Units.vue';
import Tasks from '../views/Tasks.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/units', name: 'Units', component: Units },
    { path: '/tasks', name: 'Tasks', component: Tasks }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
