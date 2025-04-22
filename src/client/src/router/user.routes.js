import UserDashboard from '../user/HomeScreen.vue';
import DatasetGallery from '../user/dataset-components/DatasetGallery.vue';
import DatasetRegistrationOverview from '../user/dataset-components/DatasetRegistrationOverview.vue';
import DatasetRegistrationWrapper from '../user/dataset-components/DatasetRegistrationWrapper.vue';
import DatasetRegistrationStep1 from '../user/dataset-components/DatasetRegistrationStep1.vue';
import DatasetRegistrationStep2 from '../user/dataset-components/DatasetRegistrationStep2.vue';
import DatasetRegistrationStep3 from '../user/dataset-components/DatasetRegistrationStep3.vue';
import DatasetRegistrationStep4 from '../user/dataset-components/DatasetRegistrationStep4.vue';
import DatasetRegistrationStep5 from '../user/dataset-components/DatasetRegistrationStep5.vue';

import UseCaseGallery from '../user/usecase-components/UseCaseGallery.vue';
import UseCaseRegistrationOverview from '../user/usecase-components/UseCaseRegistrationOverview.vue';
import UseCaseRegistrationWrapper from '../user/usecase-components/UseCaseRegistrationWrapper.vue';
import UseCaseRegistrationStep1 from '../user/usecase-components/UseCaseRegistrationStep1.vue';

export const userRoutes = [
  {
    path: '/user/dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false }
  },
  {
    path: '/user/datasets',
    component: DatasetGallery,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false }
  },
  {
    path: '/user/datasets/register',
    component: DatasetRegistrationOverview,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false }
  },
  {
    path: '/user/datasets/register/steps',
    component: DatasetRegistrationWrapper,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false },
    children: [
      { path: '1', component: DatasetRegistrationStep1, name: 'UserGDRStep1' },
      { path: '2', component: DatasetRegistrationStep2, name: 'UserGDRStep2' },
      { path: '3', component: DatasetRegistrationStep3, name: 'UserGDRStep3' },
      { path: '4', component: DatasetRegistrationStep4, name: 'UserGDRStep4' },
      { path: '5/:datasetId?', component: DatasetRegistrationStep5, name: 'UserGDRStep5', props: route => ({ datasetId: route.params.datasetId }) },
    ]
  },
  {
    path: '/user/usecases',
    component: UseCaseGallery,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false }
  },
  {
    path: '/user/usecases/register',
    component: UseCaseRegistrationOverview,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false }
  },
  {
    path: '/user/usecases/register/steps',
    component: UseCaseRegistrationWrapper,
    meta: { requiresAuth: true, requiresAdmin: false, hideHeader: false },
    children: [
      { path: '1', component: UseCaseRegistrationStep1, name: 'UserUCRStep1' }
    ]
  }
];