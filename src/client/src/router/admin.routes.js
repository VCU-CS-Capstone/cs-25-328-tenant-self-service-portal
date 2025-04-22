import AdminDashboard from '../admin/HomeScreen.vue';
import DatasetGallery from '../admin/dataset-components/DatasetGallery.vue';
import DatasetRegistrationOverview from '../admin/dataset-components/DatasetRegistrationOverview.vue';
import DatasetRegistrationWrapper from '../admin/dataset-components/DatasetRegistrationWrapper.vue';
import DatasetRegistrationStep1 from '../admin/dataset-components/DatasetRegistrationStep1.vue';
import DatasetRegistrationStep2 from '../admin/dataset-components/DatasetRegistrationStep2.vue';
import DatasetRegistrationStep3 from '../admin/dataset-components/DatasetRegistrationStep3.vue';
import DatasetRegistrationStep4 from '../admin/dataset-components/DatasetRegistrationStep4.vue';
import DatasetRegistrationStep5 from '../admin/dataset-components/DatasetRegistrationStep5.vue';

import UseCaseGallery from '../admin/usecase-components/UseCaseGallery.vue';
import UseCaseRegistrationOverview from '../admin/usecase-components/UseCaseRegistrationOverview.vue';
import UseCaseRegistrationWrapper from '../admin/usecase-components/UseCaseRegistrationWrapper.vue';
import UseCaseRegistrationStep1 from '../admin/usecase-components/UseCaseRegistrationStep1.vue';

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false }
  },
  {
    path: '/admin/datasets',
    component: DatasetGallery,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false }
  },
  {
    path: '/admin/datasets/register',
    component: DatasetRegistrationOverview,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false }
  },
  {
    path: '/admin/datasets/register/steps',
    component: DatasetRegistrationWrapper,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false },
    children: [
      { path: '1', component: DatasetRegistrationStep1, name: 'AdminGDRStep1' },
      { path: '2', component: DatasetRegistrationStep2, name: 'AdminGDRStep2' },
      { path: '3', component: DatasetRegistrationStep3, name: 'AdminGDRStep3' },
      { path: '4', component: DatasetRegistrationStep4, name: 'AdminGDRStep4' },
      { path: '5/:datasetId?', component: DatasetRegistrationStep5, name: 'AdminGDRStep5', props: route => ({ datasetId: route.params.datasetId }) },
    ]
  },
  {
    path: '/admin/usecases',
    component: UseCaseGallery,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false }
  },
  {
    path: '/admin/usecases/register',
    component: UseCaseRegistrationOverview,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false }
  },
  {
    path: '/admin/usecases/register/steps',
    component: UseCaseRegistrationWrapper,
    meta: { requiresAuth: true, requiresAdmin: true, hideHeader: false },
    children: [
      { path: '1', component: UseCaseRegistrationStep1, name: 'AdminUCRStep1' }
    ]
  }
];
