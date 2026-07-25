import axios from 'axios';

// Create an Axios instance with the backend base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api',   // Change this to your production URL when deploying
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor – attaches the JWT token to every request
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage (or sessionStorage)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token; // This matches your backend middleware
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor – handles global errors (like unauthorized)
api.interceptors.response.use(
  (response) => {
    // Any status code within 2xx triggers this
    return response;
  },
  (error) => {
    // Handle 401 (unauthorized) globally – e.g., redirect to login
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;