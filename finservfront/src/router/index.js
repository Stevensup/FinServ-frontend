import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ProfileView from '@/views/Profile.vue'; 
import CreditCard from '@/views/CreditCard.vue';
import Insurance from '@/views/Insurance.vue';
import Investments from '@/views/Investments.vue';


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/investments',
    name: 'Investments',
    component: Investments
  },
  {
    path: '/insurance',
    name: 'Insurance',
    component: Insurance
  },
  {
    path: '/PQR',
    name: 'Pqr',
  },
  {
    path: '/creditcard',
    name: 'CreditCard',
    component: CreditCard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Dashboard',
    name: 'DashboardView',
    component: Dashboard
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView 
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
