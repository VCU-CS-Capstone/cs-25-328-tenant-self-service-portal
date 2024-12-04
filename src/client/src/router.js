import { createRouter, createWebHistory } from 'vue-router'

import HomeScreen from './components/HomeScreen.vue'
import DatasetGallery from './components/DatasetGallery.vue'
import UseCaseGallery from './components/UseCaseGallery.vue'

const routes = [
    { path: '/', component: HomeScreen },
    { path: '/datasets', component: DatasetGallery },
    { path: '/usecases', component: UseCaseGallery },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
