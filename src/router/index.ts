// export default router
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue';
import LoginView from '@/views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/feed',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/maps',
      name: 'Map',
      component: MapView,
    },
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: LogoutView
    }
  ],
});

export default router;
