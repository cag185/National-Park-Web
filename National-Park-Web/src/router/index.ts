// export default router
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '/Users/caleb/Documents/Code/Projects/National-Park-Web/National-Park-Web/src/views/HomeView.vue';
import MapView from '../views/MapView.vue';

const router = createRouter({
  history: createWebHistory(),
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
    }
  ],
});

export default router;
