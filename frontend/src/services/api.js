import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Existing methods
  getSuppliers: () => axiosInstance.get('/suppliers/'),
  getSupplier: (id) => axiosInstance.get(`/suppliers/${id}/`),
  getComplianceRecords: (supplierId) => 
    axiosInstance.get(`/suppliers/${supplierId}/compliance-records/`),
  checkCompliance: (id, data) => axiosInstance.post('/suppliers/check-compliance/', {
    metric: data.metric,
    result: data.result,
    status: data.status,
    supplier_id: id
  }),
  getInsights: (id) => axiosInstance.get(`/suppliers/insights/${id}/`),

  // New method for creating supplier
  createSupplier: (data) => {
    // Format the date to match backend expectations
    const formattedData = {
      ...data,
      last_audit: data.last_audit,
      contract_terms: data.contract_terms || '', // Ensure contract_terms is never null
      compliance_score: parseInt(data.compliance_score, 10) // Ensure integer type
    };
    return axiosInstance.post('/suppliers/', formattedData);
  },
};