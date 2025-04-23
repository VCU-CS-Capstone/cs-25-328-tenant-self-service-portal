import LoginScreen from '../components/auth/LoginScreen.vue';
import CreateAccountScreen from '../components/auth/CreateAccountScreen.vue';

export const authRoutes = [
  {
    path: '/login',
    component: LoginScreen,
    meta: { requiresAuth: false, hideHeader: true }
  },
  {
    path: '/register',
    component: CreateAccountScreen,
    meta: { requiresAuth: false, hideHeader: true }
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/dashboard',
    redirect: () => {
      const token = localStorage.getItem('token');
      if (!token) return '/login';

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.is_admin ? '/admin/dashboard' : '/user/dashboard';
      } catch (e) {
        return '/login';
      }
    }
  }
];
