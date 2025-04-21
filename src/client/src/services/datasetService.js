import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

// Create axios instance with default headers for auth
const createApiInstance = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  // Only add the Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: API_URL,
    headers,
  });
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

// Save draft dataset
export const saveDatasetDraft = async (formData) => {
    const api = createApiInstance();
    const formattedData = formatDatasetData(formData);
    
    try {
      let response;
      
      // If we have a dataset ID, update existing draft
      if (formData.dataset_id) {
        response = await api.put(`/datasets/${formData.dataset_id}`, formattedData);
      } else {
        // Otherwise create a new draft
        response = await api.post('/datasets', formattedData);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error saving dataset draft:', error);
      throw error;
    }
};

// Submit dataset for review
export const submitDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.post(`/datasets/${datasetId}/submit`);
    return response.data;
  } catch (error) {
    console.error('Error submitting dataset:', error);
    throw error;
  }
};

// Get all datasets (with optional filters)
export const getAllDatasets = async (filters = {}) => {
  try {
    const api = createApiInstance();
    const response = await api.get('/datasets', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching datasets:', error);
    throw error;
  }
};

// Get dataset by ID
export const getDatasetById = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/datasets/${datasetId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dataset:', error);
    throw error;
  }
};

// Approve dataset (admin only)
export const approveDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.post(`/datasets/${datasetId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving dataset:', error);
    throw error;
  }
};

// Reject dataset (admin only)
export const rejectDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    const response = await api.post(`/datasets/${datasetId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting dataset:', error);
    throw error;
  }
};

export default {
  saveDatasetDraft,
  submitDataset,
  getAllDatasets,
  getDatasetById,
  approveDataset,
  rejectDataset
};