import axios from 'axios';

// ✅ Token fetch function
const getToken = () => {
  return localStorage.getItem('token') || null; // token is plain string
};

// ✅ Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5800/api',
});

// ✅ Request Interceptor — Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    console.log("token", token);
    

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor — Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized - Redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
