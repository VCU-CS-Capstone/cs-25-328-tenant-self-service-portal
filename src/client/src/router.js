import { createRouter, createWebHistory } from 'vue-router'

// Auth screen imports
import LoginScreen from './components/auth-components/LoginScreen.vue'

import HomeScreen from './components/HomeScreen.vue'
import DatasetGallery from './components/dataset-components/DatasetGallery.vue'
import UseCaseGallery from './components/usecase-components/UseCaseGallery.vue'

// Dataset registration imports
import DatasetRegistrationOverview from './components/dataset-components/DatasetRegistrationOverview.vue'
import DatasetRegistrationStep1 from './components/dataset-components/DatasetRegistrationStep1.vue'
import DatasetRegistrationStep2 from './components/dataset-components/DatasetRegistrationStep2.vue'
import DatasetRegistrationStep3 from './components/dataset-components/DatasetRegistrationStep3.vue'
import DatasetRegistrationStep4 from './components/dataset-components/DatasetRegistrationStep4.vue'
import DatasetRegistrationStep5 from './components/dataset-components/DatasetRegistrationStep5.vue'
import DatasetRegistrationWrapper from './components/dataset-components/DatasetRegistrationWrapper.vue'

// Use case registration import
import UseCaseRegistrationOverview from './components/usecase-components/UseCaseRegistrationOverview.vue'
import UseCaseRegistrationStep1 from './components/usecase-components/UseCaseRegistrationStep1.vue'
import UseCaseRegistrationWrapper from './components/usecase-components/UseCaseRegistrationWrapper.vue'
import CreateAccountScreen from './components/auth-components/CreateAccountScreen.vue'

const routes = [
  {
    path: '/login',
    component: LoginScreen,
    name: "LoginScreen",
    meta: { 
      hideHeader: true,
      requiresAuth: false
     }
  },
  {
    path: '/create',
    component: CreateAccountScreen,
    meta: { 
      hideHeader: true,
      requiresAuth: false }
  },
  { 
    path: '/dashboard', 
    component: HomeScreen,
    meta: { 
      hideHeader: false,
      requiresAuth: true }
  },
  { 
    path: '/datasets', 
    component: DatasetGallery,
    meta: { hideHeader: false, requiresAuth: true }
  },
  { 
    path: '/usecases', 
    component: UseCaseGallery,
    meta: { hideHeader: false, requiresAuth: true }
  },
  { 
    path: '/datasets/register', 
    component: DatasetRegistrationOverview,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path: '/datasets/register/steps',
    component: DatasetRegistrationWrapper,
    meta: { hideHeader: false, requiresAuth: true },
    children: [
      {
        path: '1',
        component: DatasetRegistrationStep1,
        name: 'GDRStep1'
      }, 
      {
        path: '2',
        component: DatasetRegistrationStep2,
        name: 'GDRStep2'
      },
      {
        path: '3',
        component: DatasetRegistrationStep3,
        name: 'GDRStep3'
      }, 
      {
        path: '4',
        component: DatasetRegistrationStep4,
        name: 'GDRStep4'
      }, 
      {
        path: '5',
        component: DatasetRegistrationStep5,
        name: 'GDRStep5'
      }
    ]
  },
  {
    path:'/usecases/register',
    component: UseCaseRegistrationOverview,
    meta: { hideHeader: false, requiresAuth: true }
  },
  {
    path:'/usecases/register/steps',
    component: UseCaseRegistrationWrapper,
    meta: { hideHeader: false, requiresAuth: true },
    children: [
      {
        path: '1',
        component: UseCaseRegistrationStep1,
        name: 'UCRStep1'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {

    const isAuthenticated = localStorage.getItem('token') !== null
    
    if (!isAuthenticated) {
      alert(`Unable to authenticate`)
      next({ name: "LoginScreen" })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;