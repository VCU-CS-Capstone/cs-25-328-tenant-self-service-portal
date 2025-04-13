// comment.api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default headers for auth
const createApiInstance = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: `${API_URL}/comments`,
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

// Optional helper to format comment form data into the shape your API expects
const formatCommentData = (formData) => {
  return {
    // Ensure these keys match what your backend expects
    dataset_id: formData.datasetId,
    user_id: formData.userId,
    comment_text: formData.commentText
  };
};

// Get ALL comments (if you have an endpoint for that)
export const getAllComments = async () => {
  try {
    const api = createApiInstance();
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching all comments:');
  }
};

// Get comments for a specific dataset
export const getCommentsByDataset = async (datasetId) => {
  try {
    const api = createApiInstance();
    // This could vary depending on your backend route, e.g.:
//  - GET /comments?dataset_id=xxx
//  - GET /datasets/:datasetId/comments (then you’d point baseURL differently)
    const response = await api.get('/', { params: { dataset_id: datasetId } });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching comments for dataset:');
  }
};

// Get a single comment by its ID
export const getCommentById = async (commentId) => {
  try {
    const api = createApiInstance();
    const response = await api.get(`/${commentId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching comment by ID:');
  }
};

// Create a new comment
export const createComment = async (formData) => {
  try {
    const api = createApiInstance();
    const commentData = formatCommentData(formData);
    const response = await api.post('/', commentData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error creating a new comment:');
  }
};

// Update an existing comment (if your app allows editing)
export const updateComment = async (commentId, formData) => {
  try {
    const api = createApiInstance();
    const commentData = formatCommentData(formData);
    const response = await api.put(`/${commentId}`, commentData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error updating comment:');
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const api = createApiInstance();
    const response = await api.delete(`/${commentId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error deleting comment:');
  }
};

export default {
  getAllComments,
  getCommentById,
  getCommentsByDataset,
  createComment,
  updateComment,
  deleteComment
};
