// export default router
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '/Users/caleb/Documents/Code/Projects/National-Park-Web/National-Park-Web/src/views/HomeView.vue'; // Make sure this path is correct

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
  ],
});

export default router;
