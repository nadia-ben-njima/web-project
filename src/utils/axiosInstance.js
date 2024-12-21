
import axios from 'axios';

// Set up axios instance with interceptors
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("sellerToken");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// You can also add a response interceptor if needed
axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle errors globally here if needed
  return Promise.reject(error);
});

export default axiosInstance;
