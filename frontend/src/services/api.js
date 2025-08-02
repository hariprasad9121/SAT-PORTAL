import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  sendRegistrationOTP: (data) => api.post('/auth/student/send-otp', data),
  studentRegister: (data) => api.post('/auth/student/register', data),
  studentLogin: (credentials) => api.post('/auth/student/login', credentials),
  adminLogin: (credentials) => api.post('/auth/admin/login', credentials),
  forgotPassword: (data) => api.post('/auth/student/forgot-password', data),
  resetPassword: (data) => api.post('/auth/student/reset-password', data),
};

// Student API
export const studentAPI = {
  getProfile: (studentId) => api.get(`/student/profile?student_id=${studentId}`),
  updateProfile: (data) => api.put('/student/profile', data),
  uploadCertificate: (formData) => {
    return api.post('/student/certificate/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCertificates: (studentId) => api.get(`/student/certificates?student_id=${studentId}`),
  downloadCertificate: (certificateId) => api.get(`/student/certificate/${certificateId}/download`, {
    responseType: 'blob',
  }),
  viewCertificate: (certificateId) => api.get(`/student/certificate/${certificateId}/view`, {
    responseType: 'blob',
  }),
};

// Admin API
export const adminAPI = {
  getDashboard: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/admin/dashboard?${params}`);
  },
  getCertificates: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/admin/certificates?${params}`);
  },
  getStudents: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/admin/students?${params}`);
  },
  downloadStudentsExcel: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/admin/students/download?${params}`, {
      responseType: 'blob',
    });
  },
  updateCertificateStatus: (data) => api.put('/admin/certificate/status', data),
  bulkUpdateStatus: (data) => api.put('/admin/certificate/bulk-status', data),
  getAnalytics: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/admin/analytics?${params}`);
  },
  generateReport: (params) => {
    const queryParams = new URLSearchParams(params);
    return api.get(`/admin/report?${queryParams}`, {
      responseType: 'blob',
    });
  },
};

export default api; 