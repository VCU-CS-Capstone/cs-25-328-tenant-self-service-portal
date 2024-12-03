import { createRouter, createWebHistory } from 'vue-router' //createWebHistory

import HomeScreen from './components/HomeScreen.vue'
import DatasetRegistration from './components/DatasetRegistration.vue'
import UseCaseRegistration from './components/UseCaseRegistration.vue'


const routes = [
    { path: '/', component: HomeScreen },
    { path: '/HomeScreen', component: HomeScreen },
    { path: '/DatasetRegistration', component: DatasetRegistration },
    { path: '/UseCaseRegistration', component: UseCaseRegistration },
    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
