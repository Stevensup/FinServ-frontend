import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ProfileView from '@/views/Profile.vue'; // Importa la vista Profile

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
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView // Añade la ruta para la vista Profile
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
