// export default router
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/maps',
      name: 'Map',
      component: MapView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    }
  ],
});

export default router;
