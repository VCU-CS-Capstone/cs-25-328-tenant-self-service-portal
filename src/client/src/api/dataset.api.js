// import axios from 'axios';

// const API_URL = process.env.VUE_APP_API_URL;

// // Create an axios instance with the base URL
// const api = axios.create({
//   baseURL: API_URL,
// });

// // const api = axios.create({
// //   baseURL: `${API_URL}/datasets`,
// // });

// // Helper function to handle API errors
// const handleApiError = (error) => {
//   console.error('API Error:', error.response?.data || error.message);
//   throw error;
// };

// // Get all datasets
// export const getAllDatasets = async (params = {}) => {
//   try {
//     const response = await api.get('/datasets', { params });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Get a specific dataset by ID
// export const getDatasetById = async (datasetId) => {
//   try {
//     const response = await api.get(`/${datasetId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Create a new dataset
// export const createDataset = async (datasetData) => {
//   try {
//     const response = await api.post('', datasetData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Update an existing dataset
// export const updateDataset = async (datasetId, datasetData) => {
//   try {
//     const response = await api.put(`/${datasetId}`, datasetData);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Delete a dataset
// export const deleteDataset = async (datasetId) => {
//   try {
//     const response = await api.delete(`/${datasetId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Submit a dataset for review
// export const submitDataset = async (datasetId) => {
//   try {
//     const response = await api.post(`/${datasetId}/submit`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Approve a dataset
// export const approveDataset = async (datasetId) => {
//   try {
//     const response = await api.post(`/${datasetId}/approve`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Reject a dataset
// export const rejectDataset = async (datasetId) => {
//   try {
//     const response = await api.post(`/${datasetId}/reject`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Get datasets by producer
// export const getDatasetsByProducer = async (producerId) => {
//   try {
//     const response = await api.get(`/producer/${producerId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Get datasets by consumer
// export const getDatasetsByConsumer = async (consumerId) => {
//   try {
//     const response = await api.get(`/consumer/${consumerId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Get datasets by data source
// export const getDatasetsByDataSource = async (dataSourceId) => {
//   try {
//     const response = await api.get(`/datasource/${dataSourceId}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// // Export all functions
// export default {
//   getAllDatasets,
//   getDatasetById,
//   createDataset,
//   updateDataset,
//   deleteDataset,
//   submitDataset,
//   approveDataset,
//   rejectDataset,
//   getDatasetsByProducer,
//   getDatasetsByConsumer,
//   getDatasetsByDataSource,
// };
