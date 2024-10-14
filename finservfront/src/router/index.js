import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // Otras rutas como el dashboard
  {
    path: '/Dashboard',
    name: 'DashboardView',
    component: Dashboard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
