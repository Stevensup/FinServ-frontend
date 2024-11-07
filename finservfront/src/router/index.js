import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import ProfileView from '@/views/Profile.vue'; 
import CreditCard from '@/views/CreditCard.vue';
import Insurance from '@/views/Insurance.vue';
import Investments from '@/views/Investments.vue';
import Pqrs from '@/views/Pqrs.vue';
import CreatePqr from '@/views/CreatePqr.vue';
import ViewPqrs from '@/views/ViewPqrs.vue';
import CreateInsurance from '@/views/CreateInsurance.vue';
import ViewInsurance from '@/views/ViewInsurance.vue';
import ViewCreditCard from '@/views/ViewCreditCard.vue';
import CreateCreditCard from '@/views/CreateCreditCard.vue';


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/createCreditCard',
    name: 'CreateCreditCard',
    component: CreateCreditCard
  },
  {
    path: '/viewCreditCard',
    name:'ViewCreditCard',
    component: ViewCreditCard
  },
  {
    path: '/viewInsurance',
    name: 'ViewInsurance',
    component: ViewInsurance
  },
  {
    path: '/createInsurance',
    name: 'CreateInsurance',
    component: CreateInsurance
  },
  {
    path: '/createPqr',  
    name: 'CreatePqr',
    component: CreatePqr  
  },
  {
    path: '/viewPqr',
    name: 'viewPqr',
    component : ViewPqrs
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
    component: Pqrs
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
