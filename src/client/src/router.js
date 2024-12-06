import { createRouter, createWebHistory } from 'vue-router'

import HomeScreen from './components/HomeScreen.vue'
import DatasetGallery from './components/dataset-components/DatasetGallery.vue'
import UseCaseGallery from './components/usecase-components/UseCaseGallery.vue'
import DatasetRegistration from './components/dataset-components/DatasetRegistrationOverview.vue'
import DatasetRegistrationStep1 from './components/dataset-components/DatasetRegistrationStep1.vue'
import DatasetRegistrationStep2 from './components/dataset-components/DatasetRegistrationStep2.vue'
import DatasetRegistrationStep3 from './components/dataset-components/DatasetRegistrationStep3.vue'
import DatasetRegistrationStep4 from './components/dataset-components/DatasetRegistrationStep4.vue'
import DatasetRegistrationStep5 from './components/dataset-components/DatasetRegistrationStep5.vue'
import DatasetRegistrationWrapper from './components/dataset-components/DatasetRegistrationWrapper.vue'

const routes = [
  { 
    path: '/', 
    component: HomeScreen 
  },
  { 
    path: '/datasets', 
    component: DatasetGallery 
  },
  { 
    path: '/usecases', 
    component: UseCaseGallery 
  },
  { 
    path: '/datasets/register', 
    component: DatasetRegistration
  },
  {
    path: '/datasets/register/steps',
    component: DatasetRegistrationWrapper,
    children: [
      {
        path: '1',
        component: DatasetRegistrationStep1,
        name: 'Step1'
      }, 
      {
        path: '2',
        component: DatasetRegistrationStep2,
        name: 'Step2'
      },
      {
        path: '3',
        component: DatasetRegistrationStep3,
        name: 'Step3'
      }, 
      {
        path: '4',
        component: DatasetRegistrationStep4,
        name: 'Step4'
      }, 
      {
        path: '5',
        component: DatasetRegistrationStep5,
        name: 'Step5'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;