import { createRouter, createWebHistory } from 'vue-router' //createWebHistory

import HomeScreen from './components/HomeScreen.vue'
import DatasetRegistration from './components/DatasetRegistration.vue'
import UseCaseRegistration from './components/UseCaseRegistration.vue'
import AddDatasetBasicInformation from './components/AddDatasetBasicInformation.vue'


const routes = [
    { path: '/', component: HomeScreen },
    { path: '/HomeScreen', name: "HomeScreen", component: HomeScreen },
    { path: '/DatasetRegistration', name: "DatasetRegistration", component: DatasetRegistration },
    { path: '/UseCaseRegistration', component: UseCaseRegistration },
    { path: '/AddDatasetBasicInformation', name: "AddDatasetBasicInformation", component: AddDatasetBasicInformation },
    
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
