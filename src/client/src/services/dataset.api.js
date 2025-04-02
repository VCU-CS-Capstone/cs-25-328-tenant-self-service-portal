import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default headers for auth
const createApiInstance = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: `${API_URL}/datasets`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    }
  });
};

// Helper function to handle API errors
const handleApiError = (error, customMessage) => {
  console.error(customMessage || 'API Error:', error.response?.data || error.message);
  throw error;
};

// Format dataset form data to match API requirements
const formatDatasetData = (formData) => {
  return {
    dataset_name: formData.datasetName,
    dataset_version: formData.datasetVersion || '1.0',
    line_of_business: formData.lineOfBusiness,
    description: formData.description,
    has_international_data: formData.hasInternationalData,
    accountable_executive: formData.accountableExecutive,
    performing_data_steward: formData.performingDataSteward,
    managing_data_steward: formData.managingDataSteward,
    managed_field_contracts: formData.managedFieldContracts || [],
    client_field_contracts: formData.clientFieldContracts || [],
    dataset_producers: formData.datasetProducers || [],
    dataset_consumers: formData.datasetConsumers || [],
    data_sources: formData.dataSources || [],
    life_cycle_management_policy_ids: formData.lifeCycleManagementPolicyIds || []
  };
};

// Get all datasets (with optional filters)
export const getAllDatasets = async (filters = {}) => {
  try {
    const api = createApiInstance();
    const response = await api.get('', { params: filters });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching datasets:');
  }
}; 

// Get dataset by ID
export const getDatasetById = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/${datasetId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching dataset:');
  }
};

// Save draft dataset
export const saveDatasetDraft = async (formData) => {
  const api = createApiInstance();
  const formattedData = formatDatasetData(formData);
  try {
    let response;
    // If we have a dataset ID, update existing draft
    if (formData.dataset_id) {
      response = await api.put(`/${formData.dataset_id}`, formattedData);
    } else {
      // Otherwise create a new draft
      response = await api.post('', formattedData);
    }
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error saving dataset draft:');
  }
};

// Create a new dataset
export const createDataset = async (datasetData) => {
  try {
    const api = createApiInstance();
    const response = await api.post('', datasetData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error creating dataset:');
  }
};

// Update an existing dataset
export const updateDataset = async (datasetId, datasetData) => {
  try {
    const api = createApiInstance();
    const response = await api.put(`/${datasetId}`, datasetData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error updating dataset:');
  }
};

// Delete a dataset
export const deleteDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.delete(`/${datasetId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error deleting dataset:');
  }
};

// Submit dataset for review
export const submitDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.post(`/${datasetId}/submit`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error submitting dataset:');
  }
};

// Approve dataset (admin only)
export const approveDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.post(`/${datasetId}/approve`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error approving dataset:');
  }
};

// Reject dataset (admin only)
export const rejectDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.post(`/${datasetId}/reject`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error rejecting dataset:');
  }
};

// Get datasets by producer
export const getDatasetsByProducer = async (producerId) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/producer/${producerId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching datasets by producer:');
  }
};

// Get datasets by consumer
export const getDatasetsByConsumer = async (consumerId) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/consumer/${consumerId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching datasets by consumer:');
  }
};

// Get datasets by data source
export const getDatasetsByDataSource = async (dataSourceId) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/datasource/${dataSourceId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching datasets by data source:');
  }
};

export default {
  saveDatasetDraft,
  submitDataset,
  getAllDatasets,
  getDatasetById,
  createDataset,
  updateDataset,
  deleteDataset,
  approveDataset,
  rejectDataset,
  getDatasetsByProducer,
  getDatasetsByConsumer,
  getDatasetsByDataSource
};
