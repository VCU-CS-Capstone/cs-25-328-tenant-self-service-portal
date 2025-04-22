import { createRouter, createWebHistory } from 'vue-router';
import { adminRoutes } from './admin.routes';
import { userRoutes } from './user.routes';
import { authRoutes } from './auth.routes';

const routes = [
  { path: '/', redirect: '/login' },
  ...authRoutes,
  ...adminRoutes,
  ...userRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;
  let isAdmin = false;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAuthenticated = true;
      isAdmin = !!payload.is_admin;
    } catch (e) {
      console.error('Invalid token:', e);
    }
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  if (requiresAdmin && !isAdmin) {
    return next('/user/dashboard');
  }

  next();
});

export default router;