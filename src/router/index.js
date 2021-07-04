import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/forgot_password',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword.vue'),
  },
  {
    path: '/popup.html',
    alias: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/my_faqs',
    name: 'MyFaqs',
    component: () => import('@/views/MyFaqs.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/create_faq',
    name: 'CreateFaq',
    component: () => import('@/views/CreateFaq.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/edit_faq/:id',
    name: 'EditFaq',
    component: () => import('@/views/EditFaq.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/pending_approval',
    name: 'PendingApproval',
    component: () => import('@/views/PendingApproval.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/tweets',
    name: 'Tweets',
    component: () => import('@/views/Tweets.vue'),
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function ifAuthenticated(to, from, next) {
  document.title = `${to.meta.title}`;
  if (!store.getters.getUserAuthStatus) return next({ name: 'Login' });
  else return next();
}

export default router;
