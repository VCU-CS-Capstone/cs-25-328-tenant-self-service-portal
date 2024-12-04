import { createRouter, createWebHistory } from 'vue-router'

import HomeScreen from './components/HomeScreen.vue'
import DatasetGallery from './components/dataset-components/DatasetGallery.vue'
import UseCaseGallery from './components/usecase-components/UseCaseGallery.vue'
import DatasetRegistration from './components/dataset-components/DatasetRegistrationOverview.vue'
import DatasetRegistrationStep1 from './components/dataset-components/DatasetRegistrationStep1.vue'

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/datasets', component: DatasetGallery },
  { path: '/usecases', component: UseCaseGallery },
  { path: '/datasets/register', component: DatasetRegistration},
  { path: '/datasets/register/1', component: DatasetRegistrationStep1}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
 