import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with default headers
const createApiInstance = () => {
  const token = localStorage.getItem('token');
  
  return axios.create({
    baseURL: `${API_URL}/auth`,
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

// Login user
export const loginUser = async (credentials) => {
  try {
    const api = axios.create({
      baseURL: `${API_URL}/auth`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const response = await api.post('/login', {
      email: credentials.email,
      password: credentials.password
    });
    
    // Store token in localStorage for future authenticated requests
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'Login failed:');
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const api = axios.create({
      baseURL: `${API_URL}/auth`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Log for debugging
    console.log('Sending registration data:', {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      is_admin: userData.isAdmin// ? 1 : 0
    });
    
    const response = await api.post('/register', {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      is_admin: userData.isAdmin// ? 1 : 0
    });
    
    // Store token in localStorage if registration also logs in the user
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    handleApiError(error, 'Registration failed:');
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
  // You could also call the backend to invalidate the token if needed
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const api = createApiInstance();
    // Changed from /me to /profile to match backend routes
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching user profile:');
  }
};

// Check if token is valid (can be used to verify authentication status)
export const validateToken = async () => {
  try {
    const api = createApiInstance();
    const response = await api.post('/validate-token');
    return response.data.valid;
  } catch (error) {
    // Token is invalid
    localStorage.removeItem('token');
    return false;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const api = createApiInstance();
    const response = await api.put('/profile', {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error updating profile:');
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const api = createApiInstance();
    const response = await api.put('/change-password', {
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error changing password:');
  }
};

// Admin: Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const api = createApiInstance();
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error fetching users:');
  }
};

// Admin: Update user (admin only)
export const updateUser = async (userId, userData) => {
  try {
    const api = createApiInstance();
    const response = await api.put(`/users/${userId}`, {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      is_admin: userData.isAdmin ? 1 : 0
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error updating user:');
  }
};

// Admin: Delete user (admin only)
export const deleteUser = async (userId) => {
  try {
    const api = createApiInstance();
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'Error deleting user:');
  }
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  validateToken,
  updateUserProfile,
  changePassword,
}