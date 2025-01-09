import axios from 'axios';

// Define the API base URL (ensure this is defined in your .env file as REACT_APP_API_URL)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create the axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Depending on your needs, you may want to set this to `true` for cross-site cookies
});

// Interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response, // Return response as is if no error
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Some other error occurred while setting up the request
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

// API functions
export const api = {
  // Get all suppliers
  getSuppliers: () => axiosInstance.get('/suppliers/'),

  // Get a specific supplier by ID
  getSupplier: (id) => axiosInstance.get(`/suppliers/${id}/`),

  // Create a new supplier
  createSupplier: (data) => axiosInstance.post('/suppliers/', data),

  // Check compliance for a supplier
  checkCompliance: (id, data) => axiosInstance.post(`/suppliers/check-compliance/`, {
    supplier_id: id,  // Include supplier_id explicitly
    ...data            // Spread the rest of the form data (metric, result, status)
  }),

  // Get insights for a supplier
  getInsights: (id) => axiosInstance.get(`/suppliers/insights/${id}/`),
};
